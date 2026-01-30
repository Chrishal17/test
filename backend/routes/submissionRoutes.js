const express = require('express');
const router = express.Router();
const { submitCode, getSubmissions } = require('../controllers/submissionController');

router.post('/', submitCode);
router.get('/:problemId', getSubmissions);

module.exports = router;
