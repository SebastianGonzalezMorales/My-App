const mongoose = require('mongoose');

const phraseOfTheDaySchema = mongoose.Schema({
    mensaje: String,
    autor: String
})

exports.PhraseOfTheDay = mongoose.model('PhraseOfTheDay', phraseOfTheDaySchema);
