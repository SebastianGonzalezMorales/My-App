const { User } = require('../models/user');
const { TempUser } = require('../models/tempUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Para enviar correos

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
        const { name, email, rut, birthdate, carrera, password, confirmPassword } = req.body;
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
            verificationToken
        });

        const savedTempUser = await tempUser.save();
        if (!savedTempUser) return res.status(400).send('User could not be created.');

        const verificationLink = `http://localhost:3000/api/v1/users/verificar?token=${verificationToken}`;

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
            verified: true
        });

        await user.save();
        console.log('New user saved:', user);

        await TempUser.deleteOne({ verificationToken: token });

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
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Este usuario no tiene una cuenta creada con esta dirección de correo.' });
        }

        // Lógica para generar el token y enviar el correo...
        const resetToken = jwt.sign({ userId: user._id, email: user.email }, process.env.secret, { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/api/v1/users/change-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'appacompanamientouv@gmail.com',
                pass: 'equn vtzn mkai ufga'
            }
        });

        await transporter.sendMail({
            to: normalizedEmail,
            subject: 'Restablece tu contraseña - App Acompañamiento UV',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
        });

        res.status(200).json({ success: true, message: 'Se ha enviado un correo para restablecer la contraseña.' });
    } catch (error) {
        console.error('Error al enviar el correo de restablecimiento:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


const changePassword = async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
        return res.status(400).json({
            error: true,
            message: 'Faltan datos necesarios: token, newPassword y confirmPassword son requeridos.'
        });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            error: true,
            message: 'Las contraseñas no coinciden.'
        });
    }

    if (!isStrongPassword(newPassword)) {
        return res.status(400).json({
            error: true,
            message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.secret);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'Usuario no encontrado.'
            });
        }

        const newPasswordHash = bcrypt.hashSync(newPassword, 8);
        user.passwordHash = newPasswordHash;
        await user.save();

        res.status(200).json({
            error: false,
            message: 'Contraseña restablecida con éxito.'
        });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(400).json({
            error: true,
            message: 'El enlace de restablecimiento es inválido o ha caducado.'
        });
    }
};




/*    router.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const useremail = user.email;
  
      User.findOne({ email: useremail }).then((data) => {
        return res.send({ status: "Ok", data: data });
      });
    } catch (error) {
      return res.send({ error: error });
    }
  });
 */
   
/* router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');
    
    if (!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
})

router.get(`/:id`, async (req, res) =>{
    const user = await User.findById(req.params.id.select('-passwordHash'));
    
    if (!user) {
        res.status(500).json({message: 'The user with given ID was '})
    }
    res.status(200).send(user);
})
 */

/* router.post(`/`, async (req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })

    user = await user.save();

        
    if (!user) 
        return res.status(400).send('the user cannot be created!')   
    res.send(user);
})
 */



/* router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)
    if(!userCount){
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
})

router.get(`/get/count`, async (req, res) =>{
    let count;     
    const userCount = await User.countDocuments({count: count});
    
    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
}) */


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
    changePassword
};
