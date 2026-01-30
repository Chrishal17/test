const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const Submission = require('./models/Submission');
const Problem = require('./models/Problem');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// 1. Submit Code
app.post('/api/submissions', async (req, res) => {
    try {
        const { problemId, code, language } = req.body;

        if (!problemId || !code || !language) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new submission record
        const newSubmission = new Submission({
            problemId,
            code,
            language,
            status: 'Accepted', // Mock status for now
            verdict: 'Solution passed all test cases'
        });

        const savedSubmission = await newSubmission.save();

        res.status(201).json({
            message: 'Submission saved to Atlas',
            submission: savedSubmission
        });
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ message: 'Server error during submission' });
    }
});

// 2. Get Problems (for frontend list)
app.get('/api/problems', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching problems' });
    }
});

// 3. Get Single Problem
app.get('/api/problems/:id', async (req, res) => {
    try {
        const problem = await Problem.findOne({ problemId: req.params.id });
        if (!problem) return res.status(404).json({ message: 'Problem not found' });
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching problem' });
    }
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
