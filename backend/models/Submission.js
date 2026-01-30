const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    problemId: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // "Accepted", "Wrong Answer", "Pending"
    verdict: { type: String }, // Optional detailed message
}, {
    timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);
