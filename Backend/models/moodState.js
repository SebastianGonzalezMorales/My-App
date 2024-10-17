const mongoose = require('mongoose');

const moodStateSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
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
    Activities: {              
        type: [String], 
        required: false,
     },
    title: {              
        type: String,
        required: false,
     },
    commentarios: {
        type: String,
        required: false,
    },
    date: {
       type: Date,
       default: Date.now, 
       required: true,
    },

})


exports.MoodState = mongoose.model('MoodState', moodStateSchema);
exports.moodStateSchema = moodStateSchema;
