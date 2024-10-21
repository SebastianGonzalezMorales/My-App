const { User } = require('../models/user');
const { TempUser } = require('../models/tempUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Para enviar correos


const verifyTokenController = (req, res) => {
    res.status(200).json({ message: 'Token válido' });
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Convertir el email a minúsculas antes de buscar en la base de datos
    const normalizedEmail = email.toLowerCase();

    // Busca en la colección temporal primero
    const tempUser = await TempUser.findOne({ email: normalizedEmail });
    if (tempUser) {
        return res.status(403).send('Por favor verifique su correo electrónico antes de iniciar sesión.');
    }

    // Busca en la colección de usuarios
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
        return res.status(400).send('Usuario no encontrado');
    }

    if (!user.verified) {
        return res.status(403).send('Por favor verifique su correo electrónico antes de iniciar sesión.');
    }

    if (bcrypt.compareSync(password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                isAdmin: user.isAdmin
            },
            process.env.secret,
            { expiresIn: '1d' }
        );
        return res.status(200).send({ name: user.name, user: user.email, token });
    } else {
        return res.status(400).send('Password is wrong!');
    }
};


// Controlador para obtener datos de usuario
const getUserData = async (req, res) => {
    const secret = process.env.secret;
    const { token } = req.body;
    try {
        const user = jwt.verify(token, secret);
       // console.log(user)
        const useremail = user.email;

        User.findOne({ email: useremail }).then((data) => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error) {
        return res.send({ error: error });
    }
};

const getUserId = async (req, res) => {
    const secret = process.env.secret; // Se obtiene la clave secreta del entorno
    const { token } = req.body; // Se extrae el token del cuerpo de la solicitud
    try {
        const user = jwt.verify(token, secret); // Se verifica y decodifica el token usando la clave secreta
        const userId = user.userId; // Asumiendo que el userId está guardado como 'id' en el payload del token
       // console.log(user);
        // Devuelve el userId en la respuesta
        return res.send({ status: "Ok", userId: userId });
    } catch (error) {
        return res.status(400).send({ error: error.message }); // Manejo de errores
    }
};

const isStrongPassword = (password) => {
    // Verificar longitud mínima
    if (password.length < 8) return false;

    // Verificar si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) return false;

    // Verificar si contiene al menos una letra minúscula
    if (!/[a-z]/.test(password)) return false;

    // Verificar si contiene al menos un número
    if (!/[0-9]/.test(password)) return false;

    // Verificar si contiene al menos un símbolo
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

    return true;
};

const registerUser = async (req, res) => {
    try {
        const { name, email, rut, birthdate, carrera, password, confirmPassword, policyAccepted } = req.body;
        // Convertir el email a minúsculas antes de guardarlo
        const normalizedEmail = email.toLowerCase();

        if (!name || !normalizedEmail || !rut || !birthdate || !carrera || !password || !confirmPassword) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }


            // Verificar si la contraseña es fuerte
        if (!isStrongPassword(password)) {
        return res.status(400).send('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.');
    }
        if (password !== confirmPassword) {
            return res.status(400).send('Las contraseñas no coinciden.');
        }
                // Verificar que el formato de la fecha sea correcto y que la fecha sea válida
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdateRegex.test(birthdate)) {
            return res.status(400).send('El formato de la fecha de nacimiento debe ser YYYY-MM-DD.');
        }
        if (!policyAccepted) {
            return res.status(400).send('Debes aceptar la política de privacidad para registrarte.');
          }
      

        // Descomponer la fecha en año, mes y día
        const [year, month, day] = birthdate.split('-').map(Number);

        // Verificar que el año sea razonable (1900 < año < año actual)
        const currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
            return res.status(400).send('El año de nacimiento no es válido.');
        }

        // Verificar que el mes esté entre 1 y 12
        if (month < 1 || month > 12) {
            return res.status(400).send('El mes de nacimiento no es válido.');
        }

        // Verificar que el día sea válido para el mes y año dado
        const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day < 1 || day > daysInMonth[month - 1]) {
            return res.status(400).send('El día de nacimiento no es válido.');
        }


        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).send('Correo electrónico ya en uso.');
        }

        const existingRut = await User.findOne({ rut: rut });
        if (existingRut) {
            return res.status(400).send('RUT already in use.');
        }

        const verificationToken = jwt.sign({ email: normalizedEmail }, process.env.secret, { expiresIn: '1h' });

        const tempUser = new TempUser({
            name,
            email: normalizedEmail,
            rut,
            birthdate,
            carrera,
            passwordHash: bcrypt.hashSync(password, 8),
            verificationToken,
            policyAccepted: true,
            policyAcceptedAt: new Date(),
        });

        const savedTempUser = await tempUser.save();
        if (!savedTempUser) return res.status(400).send('User could not be created.');

        // Obtener el puerto
        const PORT = process.env.PORT || 3001;

        // Obtener BASE_URL para producción
        const baseUrl = process.env.BASE_URL;
        
        const verificationLink = `http://${baseUrl}:${PORT}/api/v1/users/verificar?token=${verificationToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'appacompanamientouv@gmail.com',
                pass: 'equn vtzn mkai ufga'
            }
        });

        await transporter.sendMail({
            to: normalizedEmail,
            subject: '[Verifique su correo electrónico - App Acompañamiento UV]',
            text: `Por favor verifique su cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
        });

        res.status(201).send({
            message: 'Registration successful. Please check your email to verify your account.',
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    console.log('Verifying email with token:', token);

    try {
        const decoded = jwt.verify(token, process.env.secret);
        const email = decoded.email;

        const tempUser = await TempUser.findOne({ verificationToken: token });
        if (!tempUser) {
            console.log('No temporary user found or token expired.');
            return res.status(400).send(`
                <html>
                    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 32px; color: #000C7B;">Token de verificación no válido o caducado.</h1>
                    </body>
                </html>
            `);
        }

        const user = new User({
            name: tempUser.name,
            email: tempUser.email,
            rut: tempUser.rut,
            birthdate: tempUser.birthdate,
            carrera: tempUser.carrera,
            passwordHash: tempUser.passwordHash,
            verified: true,
            policyAccepted: true,
            policyAcceptedAt: new Date(),
        });

        await user.save();
        console.log('New user saved:', user);

        // Envolver la eliminación del usuario temporal en un bloque try-catch
        try {
            const deleteResult = await TempUser.deleteOne({ verificationToken: token });

            if (deleteResult.deletedCount === 0) {
                console.error('Failed to delete temporary user');
                return res.status(500).send(`
                    <html>
                        <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                            <h1 style="font-size: 32px; color: #000C7B;">Hubo un problema al eliminar el usuario temporal. Por favor, intenta nuevamente.</h1>
                        </body>
                    </html>
                `);
            }

            console.log('Temporary user deleted successfully');
        } catch (error) {
            console.error('Error during temporary user deletion:', error.message);
            return res.status(500).send(`
                <html>
                    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 32px; color: #000C7B;">Error al eliminar el usuario temporal. Intenta nuevamente más tarde.</h1>
                    </body>
                </html>
            `);
        }

        return res.send(`
            <html>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 32px; color: #000C7B;">El correo electrónico se ha verificado correctamente. Su cuenta ya está activa.</h1>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error during email verification:', error.message);
        return res.status(400).send(`
            <html>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 32px; color: #000C7B;">Enlace de verificación no válido o vencido.</h1>
                </body>
            </html>
        `);
    }
};

module.exports = registerUser;


// Controlador para obtener un usuario aleatorio
const getRandomUser = async (req, res) => {
    try {
        const data = await User.aggregate([
            { $sample: { size: 1 } },
            { $project: { name: 1 } }
        ]);
        if (data.length > 0) {
            res.send({ status: "Ok", name: data[0].name });
        } else {
            res.send({ status: "Error", message: "No users found" });
        }
    } catch (error) {
        return res.send({ status: "Error", error: error.message });
    }
};

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const data = await User.find({});
        res.send({ status: "Ok", data: data });
    } catch (error) {
        return res.send({ error: error });
    }
};


// Controlador para actualizar un usuario
// Falta probar
const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.updateOne(
            { email: email },
            {
                $set: {
                    name,
                    password
                },
            }
        );
        res.send({ status: "Ok", data: "Updated" });
    } catch (error) {
        return res.send({ error: error });
    }
};

// Controlador para eliminar un usuario
// Falta probar
const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        await User.deleteOne({ _id: id });
        res.send({ status: "Ok", data: "User Deleted" });
    } catch (error) {
        return res.send({ error: error });
    }
};


const revokedTokens = []; // Esta es una lista en memoria, pero en producción podrías usar una base de datos

// Controlador para el logout
const logoutUser = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]; // Obtener el token del header
    revokedTokens.push(token); // Añadir el token a la lista de tokens revocados

    res.status(200).send({ message: "User logged out successfully" });
};


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

//Controlador de prueba, para verificar que decodigicar token.
const decodeToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    const secret = process.env.secret;
    let decoded;

    // Intentar verificar el token para ver si ha expirado
    try {
        jwt.verify(token, secret);
        // Si la verificación es exitosa, decodificar el token normalmente
        decoded = jwt.decode(token);
        return res.status(200).json({ message: 'Token válido', decoded });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Decodificar el token sin verificarlo si ha expirado
            decoded = jwt.decode(token);
            return res.status(400).json({
                message: 'Token expirado',
                decoded
            });
        } else {
            // Cualquier otro error
            return res.status(400).json({ message: 'Token inválido', error: error.message });
        }
    }
};



module.exports = {
    loginUser,
    getUserData,
    getUserId,
    registerUser,
    getRandomUser,
    getAllUsers,
    updateUser,
    deleteUser,
    logoutUser,
    verifyEmail,
    forgotPassword,
    changePassword,
    verifyResetToken,
    getResetPasswordToken,
    verifyTokenController,
    decodeToken  
};
