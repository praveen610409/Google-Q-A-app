const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    source: String,
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
