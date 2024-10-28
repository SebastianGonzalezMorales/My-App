const { PhraseOfTheDay } = require('../models/phraseOfTheDay');

// Controlador para obtener todos los phraseOfTheDay
const getPhraseOfTheDay = async (req, res) => {
    try {
        const phraseOfTheDayList = await PhraseOfTheDay.find();
        if (!phraseOfTheDayList) {
            return res.status(500).json({ success: false });
        }
        res.send(phraseOfTheDayList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para crear un nuevo tip
const postPhraseOfTheDay = async (req, res) => {
    const phraseOfTheDay = new PhraseOfTheDay({
        mensaje: req.body.mensaje,
        autor: req.body.autor
    });
    try {
        const createdPhraseOfTheDay = await phraseOfTheDay.save();
        res.status(201).json(createdPhraseOfTheDay);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        });
    }
};

// Controlador para obtener un tip aleatorio
const getRandomPhraseOfTheDay = async (req, res) => {
    try {
        const data = await PhraseOfTheDay.aggregate([
            { $sample: { size: 1 } },
            { $project: { mensaje: 1, autor: 1 } }
        ]);
        if (data.length > 0) {
            res.send({ status: "Ok", mensaje: data[0].mensaje, autor: data[0].autor });
        } else {
            res.send({ status: "Error", message: "No phraseOfTheDay found" });
        }
    } catch (error) {
        return res.send({ status: "Error", error: error.message });
    }
};

module.exports = {
    getPhraseOfTheDay,
    postPhraseOfTheDay,
    getRandomPhraseOfTheDay
};
