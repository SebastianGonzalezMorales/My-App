const mongoose = require('mongoose');

const tipsSchema = mongoose.Schema({
    name: String,
    description: String
})

exports.Tips = mongoose.model('Tips', tipsSchema);
