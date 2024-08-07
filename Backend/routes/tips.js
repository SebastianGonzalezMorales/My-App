const {Tips} = require('../models/tips');
const express = require('express');
const router = express.Router();


router.get(`/get-tips`, async (req, res) => {
    const tipsList = await Tips.find();
    if(!tipsList) {
        res.status(500).json({success: false})
    }
    res.send(tipsList);
})


// http://localhost:3000/api/v1/tips
router.post(`/post-tips`, (req, res) => {
    const tips = new Tips({
        name: req.body.name,
        description: req.body.description
    })
    tips.save().then((createdTips=>{
        res.status(201).json(createdTips)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            sucess: true
        })
    })
})


module.exports = router;