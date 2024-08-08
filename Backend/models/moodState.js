const mongoose = require('mongoose');

const moodStateSchema = new mongoose.Schema({

    user_id: {              
        type: String,
        required: true,
     },
    date: {
       type: Date,
       required: true,
    },
    mood_state: {
        type: String,
        required: true,
    },
    intensidad: {
        type: Number,
        required: true,
    },
    commentarios: {
        type: String,
        required: false,
    }
})


exports.MoodState = mongoose.model('MoodState', moodStateSchema);
exports.moodStateSchema = moodStateSchema;
