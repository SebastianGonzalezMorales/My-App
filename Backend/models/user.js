const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    carrera: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false
    },
    canResetPassword: {
        type: Boolean,
        default: false // Para controlar si el usuario puede restablecer la contraseña
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },

    // Nuevos campos para la política de privacidad
    policyAccepted: { 
        type: Boolean, 
        default: false 
    },
    policyAcceptedAt: { 
        type: Date, 
        default: null
    }
});



exports.User = mongoose.model('User', usersSchema);
exports.usersSchema = usersSchema;
