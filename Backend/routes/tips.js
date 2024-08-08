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
        mensaje: req.body.mensaje,
        autor: req.body.autor
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

router.get("/get-random-tips", async (req, res) => {
  try {
    const data = await  Tips.aggregate([
      { $sample: { size: 1 } },
      { $project: { mensaje: 1, autor: 1} }
    ]);
    if (data.length > 0) {
      res.send({ status: "Ok", mensaje: data[0].mensaje, autor: data[0].autor });
    } else {
      res.send({ status: "Error", message: "No users found" });
    }
  } catch (error) {
    return res.send({ status: "Error", error: error.message });
  }
});

module.exports = router;