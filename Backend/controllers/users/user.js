const User = require('../../models/user');

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


const testUser = (req, res) => {
    if (req.user) {
        res.status(200).json({ message: 'Usuario autenticado', user: req.user });
    } else {
        res.status(401).json({ message: 'No se encontró el usuario' });
    }
};



module.exports = { getUserData, getAllUsers, updateUser, deleteUser, getRandomUser, testUser  };
