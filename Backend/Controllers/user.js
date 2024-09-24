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
        return res.status(400).send('The user not found');
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

const registerUser = async (req, res) => {
    try {
        const { name, email, rut, birthdate, carrera, password, confirmPassword } = req.body;
        // Convertir el email a minúsculas antes de guardarlo
        const normalizedEmail = email.toLowerCase();

        if (!name || !normalizedEmail || !rut || !birthdate || !carrera || !password || !confirmPassword) {
            return res.status(400).send('All fields are required.');
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).send('Email already in use.');
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
                user: 'sgonzalezm9045@gmail.com',
                pass: 'anbv thom ijss ybxq'
            }
        });

        await transporter.sendMail({
            to: normalizedEmail,
            subject: '[Verifique su correo electrónico]',
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
                        <h1 style="font-size: 32px; color: #000C7B;">Invalid or expired verification token.</h1>
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
                    <h1 style="font-size: 32px; color: #000C7B;">Email verified successfully. Your account is now active.</h1>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error during email verification:', error.message);
        return res.status(400).send(`
            <html>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 32px; color: #000C7B;">Invalid or expired verification link.</h1>
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
    registerUser,
    getRandomUser,
    getAllUsers,
    updateUser,
    deleteUser,
    logoutUser,
    verifyEmail
};
