const Submission = require('../models/Submission');

// @desc    Submit code for a problem
// @route   POST /api/submissions
// @access  Public
// Helper to validate code (Mocking syntax check)
const validateCode = (code, language) => {
    // 1. Check for empty or too short code
    if (!code || code.trim().length < 10) {
        return { valid: false, message: 'Code is too short or empty.' };
    }

    // 2. Check for unbalanced brackets (Basic Syntax Check)
    const stack = [];
    const brackets = { '(': ')', '{': '}', '[': ']' };

    // Simple iteration to check matching pairs
    // Note: This is a basic check and ignores strings/comments which might cause false positives,
    // but serves as a good "mock" syntax checker.
    for (let char of code) {
        if (brackets[char]) {
            stack.push(char);
        } else if (Object.values(brackets).includes(char)) {
            const last = stack.pop();
            if (brackets[last] !== char) {
                return { valid: false, message: 'Syntax Error: Unbalanced brackets caused by ' + char };
            }
        }
    }

    if (stack.length > 0) {
        return { valid: false, message: 'Syntax Error: Missing closing brackets for ' + stack.join(', ') };
    }

    // 3. Language-specific basic checks
    if (language === 'javascript') {
        if (!code.includes('function') && !code.includes('=>') && !code.includes('return')) {
            return { valid: false, message: 'JavaScript code should contain a function or return statement.' };
        }
    } else if (language === 'python') {
        if (!code.includes('def ') && !code.includes('return')) {
            return { valid: false, message: 'Python code should contain a function definition or return statement.' };
        }
    } else if (language === 'java') {
        if (!code.includes('public static void main') && !code.includes('class ')) {
            return { valid: false, message: 'Java code should contain a main method or class definition.' };
        }
    }

    return { valid: true };
};

// Mock judge function to simulate code execution
const mockJudge = (code, language, problemId) => {
    // Simple mock: Check if code contains 'return' for accepted, else wrong
    // In a real system, this would compile and run against test cases
    const hasReturn = code.includes('return');
    if (hasReturn) {
        return { status: 'Accepted', verdict: 'Solution passed all test cases.' };
    } else {
        return { status: 'Wrong Answer', verdict: 'Solution failed test cases. Check your logic.' };
    }
};

// @desc    Submit code for a problem
// @route   POST /api/submissions
// @access  Public
const submitCode = async (req, res) => {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // validate code
    const validation = validateCode(code, language);
    if (!validation.valid) {
        return res.status(400).json({
            message: 'Submission Rejected: ' + validation.message,
            error: validation.message,
            rejected: true
        }); // Do NOT save to DB
    }

    try {
        // Use mock judge to simulate code execution
        const judgeResult = mockJudge(code, language, problemId);
        const { status, verdict } = judgeResult;

        // Log the submission
        console.log(`Submission for problem ${problemId}: Status - ${status}, Language - ${language}`);

        const submission = await Submission.create({
            problemId,
            code,
            language,
            status,
            verdict
        });

        res.status(201).json({
            message: 'Submission received',
            submission
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get submissions for a specific problem (Optional utility)
// @route   GET /api/submissions/:problemId
// @access  Public
const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ problemId: req.params.problemId }).sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    submitCode,
    getSubmissions
};
