const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para el login
const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;

    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email, 
                isAdmin: user.isAdmin
            },
            secret,

            // El token expira en 24 horas, si quisiera colocarlo en 10segundos, debería ser así: '10s'
            { expiresIn: '1d' }
        );
        res.status(200).send({ name: user.name, user: user.email, token: token });
    } else {
        res.status(400).send('password is wrong!');
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


// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        // Extraer los campos del cuerpo de la solicitud
        const { name, email, rut, birthdate, carrera, password, confirmPassword } = req.body;

        // Validación básica de datos
        if (!name || !email || !rut || !birthdate || !carrera|| !password || !confirmPassword) {
            return res.status(400).send('Name, email, rut, birthdate, carrera, password, and password confirmation are required.');
        }

        // Verificar si la contraseña y la confirmación coinciden
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        // Verificar si el correo electrónico ya está en uso
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('Email already in use.');
        }

         // Verificar si el RUT ya está en uso
         const existingRut = await User.findOne({ rut: rut });
         if (existingRut) {
             return res.status(400).send('RUT already in use.');
         }

        // Crear nuevo usuario
        const user = new User({
            name,
            email,
            rut,
            birthdate,
            carrera,
            passwordHash: bcrypt.hashSync(password, 8),
            // Puedes agregar otros campos aquí si los estás usando
        });

        // Guardar el usuario
        const savedUser = await user.save();
        if (!savedUser) return res.status(400).send('The user cannot be created!');
        
        // Enviar respuesta
        res.status(201).send(savedUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
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
    logoutUser
};
