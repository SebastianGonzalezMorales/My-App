const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Servicio de correos

// Asignar la clave secreta desde las variables de entorno
const secret = process.env.SECRET;

if (!secret) {
  throw new Error('La clave secreta (SECRET) no está definida en las variables de entorno.');
}

// Función para restablecer la contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ success: false, message: 'No se encontró una cuenta con este correo.' });
    }

    const firstName = user.name.split(' ')[0];
    const resetToken = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '1h' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    user.canResetPassword = false;
    await user.save();

    const baseUrl = process.env.BASE_URL;
    const apiUrl = process.env.API_URL;

    const resetLink = `${baseUrl}${apiUrl}/password/verify-reset-token?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Variable de entorno para el correo
        pass: process.env.EMAIL_PASS, // Variable de entorno para la contraseña
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:app_logo" alt="App Acompañamiento UV" style="width: 100px; height: auto;">
        </div>
        <h2 style="color: #1d72b8; text-align: center;">Restablece tu Contraseña</h2>
        <p>Hola <strong>${firstName}</strong>,</p>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en la <strong>App Acompañamiento UV</strong>.</p>
        <p>Si realizaste esta solicitud, haz clic en el siguiente botón para restablecer tu contraseña:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Restablecer Contraseña</a>
        </div>
        <p>Este enlace es válido por 1 hora.</p>
        <p>Si no solicitaste este restablecimiento, por favor ignora este correo. Tu contraseña seguirá siendo segura.</p>
        <p>Saludos cordiales,</p>
        <p style="font-style: italic; color: #333;">Equipo de App Acompañamiento UV</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; text-align: center; color: #777;">
          Este correo se ha enviado automáticamente. Por favor, no respondas a este mensaje.
        </p>
      </div>
    `;

    await transporter.sendMail({
      to: normalizedEmail,
      subject: 'Restablece tu contraseña - App Acompañamiento UV',
      html: htmlContent,
      attachments: [
        {
          filename: 'Icon_Application_Blue.png',
          path: 'public/Icon_Application_Blue.png',
          cid: 'app_logo',
        },
      ],
    });

    res.status(200).json({ success: true, message: 'Se ha enviado un correo para restablecer la contraseña. Por favor, revisa tu bandeja de entrada.' });
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

const changePassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'Debes ingresar y confirmar la nueva contraseña.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    const user = await User.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
      canResetPassword: true,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'El enlace de restablecimiento es inválido o ha caducado.',
      });
    }

    user.passwordHash = bcrypt.hashSync(newPassword, 8);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.canResetPassword = false;
    await user.save();

    res.status(200).json({ success: true, message: 'Contraseña actualizada con éxito. Ahora puedes iniciar sesión.' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(400).json({ success: false, message: 'Error al cambiar la contraseña.' });
  }
};

const verifyResetToken = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    const user = await User.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send(`
        <html>
          <body>
            <h1>El enlace de restablecimiento es inválido o ha caducado.</h1>
          </body>
        </html>
      `);
    }

    user.canResetPassword = true;
    await user.save();

    res.status(200).send(`
      <html>
        <body>
          <h1>El token es válido. Puedes restablecer tu contraseña ahora.</h1>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(400).send(`
      <html>
        <body>
          <h1>El enlace de restablecimiento es inválido o ha caducado.</h1>
        </body>
      </html>
    `);
  }
};

// Controlador para obtener el token de restablecimiento de contraseña
const getResetPasswordToken = async (req, res) => {
    const { email } = req.body; // Obtiene el correo electrónico del cuerpo de la solicitud

    // Expresión regular para validar el formato nombre.apellido@alumnos.uv.cl
    const emailRegex = /^[a-z]+\.[a-z]+@alumnos\.uv\.cl$/;

    // Verifica que el formato del correo sea correcto
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "El correo electrónico no tiene el formato correcto" });
    }

    try {
        // Busca al usuario por correo electrónico
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        // Verifica si hay un token de restablecimiento
        if (!user.resetPasswordToken) {
            return res.status(400).send({ message: "No hay token de restablecimiento para este usuario" });
        }

        // Devuelve el token de restablecimiento
        return res.status(200).send({
            message: "Token encontrado",
            resetPasswordToken: user.resetPasswordToken
        });

    } catch (error) {
        // Manejo de errores
        return res.status(500).send({ message: "Error del servidor", error: error.message });
    }
};

module.exports = { forgotPassword, changePassword, verifyResetToken, getResetPasswordToken };