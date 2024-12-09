const User = require('../../models/user');
const { TempUser } = require('../../models/tempUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Servicio de correos

const validator = require('validator');



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
            { expiresIn: '4d' }
        );
        return res.status(200).send({ name: user.name, user: user.email, token });
    } else {
        return res.status(400).send('Password is wrong!');
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, rut, birthdate, facultad, carrera, phoneNumber, password, confirmPassword, policyAccepted } = req.body;
        // Convertir el email a minúsculas antes de guardarlo
        const normalizedEmail = email.toLowerCase();

        if (!name || !normalizedEmail || !rut || !birthdate || !facultad || !carrera || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        // Validar número de celular
        const phoneRegex = /^\+569\s?\d{8}$/; // Acepta "+569XXXXXXXX" o "+569 XXXXXXXX"
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).send('Número de celular inválido. Debe seguir el formato +569 XXXXXXXX.');
        }

        console.log('Número de celular recibido:', phoneNumber);


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
            facultad,
            carrera,
            phoneNumber,
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
        const api_url = process.env.API_URL;

    const verificationLink = `${baseUrl}${api_url}/user-management/verificar?token=${verificationToken}`;

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
            facultad: tempUser.facultad,
            carrera: tempUser.carrera,
            phoneNumber: tempUser.phoneNumber,
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

// Controlador para el logout
const logoutUser = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]; // Obtener el token del header
    revokedTokens.push(token); // Añadir el token a la lista de tokens revocados

    res.status(200).send({ message: "User logged out successfully" });
};


module.exports = { loginUser, registerUser, verifyEmail, logoutUser };