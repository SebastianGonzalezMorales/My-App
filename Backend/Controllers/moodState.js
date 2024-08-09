const { MoodState } = require('../models/moodState');


//const { authJwt }

// Controlador para obtener todos los estados de ánimo
const getMoodStates = async (req, res) => {
    try {
        const moodState = await MoodState.find();
        if (!moodState) {
            return res.status(500).json({ success: false });
        }
        res.send(moodState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para crear un nuevo estado de ánimo
const postMoodState = async (req, res) => {
    try {
        // El user_id ya está disponible en req.auth._id gracias a express-jwt
        console.log(req.auth);
        const moodState = new MoodState({
            user_id: req.auth.userId,  // Se toma automáticamente del usuario autenticado
            date: req.body.date,
            mood_state: req.body.mood_state,
            intensidad: req.body.intensidad,
            comentarios: req.body.comentarios
        });

        const createdMoodState = await moodState.save();
        res.status(201).json(createdMoodState);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        });
    }
};

module.exports = {
    getMoodStates,
    postMoodState
};
