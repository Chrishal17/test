const Problem = require('../models/Problem');

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get problem by ID (using custom problemId "P001" etc)
// @route   GET /api/problems/:id
// @access  Public
const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findOne({ problemId: req.params.id });
        if (problem) {
            res.json(problem);
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProblems,
    getProblemById
};
