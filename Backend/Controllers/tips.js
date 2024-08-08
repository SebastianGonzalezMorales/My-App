const { Tips } = require('../models/tips');

// Controlador para obtener todos los tips
const getTips = async (req, res) => {
    try {
        const tipsList = await Tips.find();
        if (!tipsList) {
            return res.status(500).json({ success: false });
        }
        res.send(tipsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para crear un nuevo tip
const postTips = async (req, res) => {
    const tips = new Tips({
        mensaje: req.body.mensaje,
        autor: req.body.autor
    });
    try {
        const createdTips = await tips.save();
        res.status(201).json(createdTips);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        });
    }
};

// Controlador para obtener un tip aleatorio
const getRandomTips = async (req, res) => {
    try {
        const data = await Tips.aggregate([
            { $sample: { size: 1 } },
            { $project: { mensaje: 1, autor: 1 } }
        ]);
        if (data.length > 0) {
            res.send({ status: "Ok", mensaje: data[0].mensaje, autor: data[0].autor });
        } else {
            res.send({ status: "Error", message: "No tips found" });
        }
    } catch (error) {
        return res.send({ status: "Error", error: error.message });
    }
};

module.exports = {
    getTips,
    postTips,
    getRandomTips
};
