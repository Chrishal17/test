const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
    problemId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    tags: [{ type: String }],
    points: { type: Number, default: 0 },
    acceptance: { type: String, default: '0%' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Problem', problemSchema);
