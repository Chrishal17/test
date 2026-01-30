const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Problem = require('./models/Problem');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        const jsonPath = path.join(__dirname, '../frontend/src/pages/problemlist.json');

        if (!fs.existsSync(jsonPath)) {
            console.error(`❌ Error: File not found at ${jsonPath}`);
            process.exit(1);
        }

        const jsonData = fs.readFileSync(jsonPath, 'utf-8');
        const problems = JSON.parse(jsonData);

        await Problem.deleteMany(); // Clear existing
        await Problem.insertMany(problems);

        console.log('✅ Data Imported Successfully to Atlas!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error}`);
        process.exit(1);
    }
};

importData();
