const { MoodState } = require('../models/moodState');

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
    const moodState = new MoodState({
        user_id: req.body.user_id,
        date: req.body.date,
        mood_state: req.body.mood_state,   // example: "feliz", "triste", "ansioso", "estresado"
        intensidad: req.body.intensidad,   // escala de 1 a 10
        comentarios: req.body.comentarios  // opcional
    });
    try {
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
