const mongoose = require('mongoose');

const tipsSchema = mongoose.Schema({
    mensaje: String,
    autor: String
})

exports.Tips = mongoose.model('Tips', tipsSchema);
