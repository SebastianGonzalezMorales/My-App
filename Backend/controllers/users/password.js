const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Servicio de correos

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        // Buscar al usuario por su email
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ success: false, message: 'No se encontró una cuenta con este correo.' });
        }

        // Generar un token de restablecimiento
        const resetToken = jwt.sign({ userId: user._id, email: user.email }, process.env.secret, { expiresIn: '1h' });

        // Guardar el token y su tiempo de expiración en el usuario, y reiniciar canResetPassword
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token válido por 1 hora
        user.canResetPassword = false; // Reiniciar la capacidad de restablecer contraseña
        await user.save();

        // Obtener el puerto
        const PORT = process.env.PORT || 3001;

        // Obtener BASE_URL para producción
        const baseUrl = process.env.BASE_URL;

        const resetLink = `http://${baseUrl}:${PORT}/api/v1/users/verify-reset-token?token=${resetToken}`;

        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'appacompanamientouv@gmail.com',
                pass: 'equn vtzn mkai ufga' // Asegúrate de manejar esto de forma segura
            }
        });

        // Enviar el correo de restablecimiento
        await transporter.sendMail({
            to: normalizedEmail,
            subject: 'Restablece tu contraseña - App Acompañamiento UV',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
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

    if (!isStrongPassword(newPassword)) {
        return res.status(400).json({
            success: false,
            message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.',
        });
    }

    try {
        // Verificar y decodificar el token JWT
        const decoded = jwt.verify(token, process.env.secret);
        const userId = decoded.userId;

        // Buscar al usuario con el token, que no haya expirado y que pueda restablecer la contraseña
        const user = await User.findOne({
            _id: userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
            canResetPassword: true // Usar el campo correcto
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'El enlace de restablecimiento es inválido, ha caducado o no ha sido verificado.',
            });
        }

        // Actualizar la contraseña del usuario
        user.passwordHash = bcrypt.hashSync(newPassword, 8);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.canResetPassword = false; // Resetear la capacidad de restablecer contraseña
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
        // Verificar y decodificar el token JWT
        const decoded = jwt.verify(token, process.env.secret);
        const userId = decoded.userId;

        // Buscar al usuario con el token de restablecimiento y verificar que no haya caducado
        const user = await User.findOne({
            _id: userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Asegurarse de que el token no haya expirado
        });

        if (!user) {
            return res.status(400).send(`
                <html>
                    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 32px; color: #000C7B;">El enlace de restablecimiento es inválido o ha caducado.</h1>
                    </body>
                </html>
            `);
        }

        // Marcar que el usuario puede restablecer la contraseña
        user.canResetPassword = true;
        await user.save();


        // Si el token es válido, responder al frontend indicando que puede cambiar su contraseña
        res.status(200).send(`
            <html>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 32px; color: #000C7B;">El token es válido. Puedes restablecer tu contraseña ahora, volviendo a tu aplicación móvil</h1>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(400).send(`
            <html>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 32px; color: #000C7B;">El enlace de restablecimiento es inválido o ha caducado.</h1>
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