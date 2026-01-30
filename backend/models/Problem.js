const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    problemId: String,
    title: String,
    description: String,
    difficulty: String,
    tags: [String],
    points: Number,
    acceptance: String
});

module.exports = mongoose.model('Problem', ProblemSchema);
