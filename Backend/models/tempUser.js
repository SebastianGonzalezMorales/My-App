const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    rut: String,
    birthdate: String,
    facultad: String,
    carrera: String,
    passwordHash: String,
    verificationToken: String, // Token para verificar el correo
    createdAt: { type: Date, expires: '1h', default: Date.now }, // Eliminar después de 1 hora
    phoneNumber: { type: String, required: true },
});

exports.TempUser = mongoose.model('TempUser', tempUserSchema);
exports.tempUserSchema = tempUserSchema;
