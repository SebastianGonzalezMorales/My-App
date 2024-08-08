const {MoodState} = require('../models/moodState');
const express = require('express');
const router = express.Router();

router.get(`/get-moodState`, async (req, res) => {
    const moodState = await MoodState.find();
    if(!moodState) {
        res.status(500).json({success: false})
    }
    res.send(moodState);
})

// http://localhost:3000/api/v1/moodState
router.post(`/post-moodState`, (req, res) => {
    const moodState = new MoodState({
       user_id: req.body.user_id,
       date: req.body.date,
       mood_state: req.body.mood_state,   // example: "feliz", "triste", "ansioso", "estresado"
       intensidad: req.body.intensidad,   // escala de 1 a 10
       comentarios: req.body.comentarios  // opcional
    })
    moodState.save().then((createdMoodState=>{
        res.status(201).json(createdMoodState)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            sucess: true
        })
    })
})

module.exports = router;