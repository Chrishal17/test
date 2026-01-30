const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    verdict: {
        type: String,
        default: ''
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
