const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // 1️⃣ Decide which MongoDB URL to use
        const mongoURI =
            process.env.MONGO_URI || "mongodb://localhost:27017"


        console.log("🔌 Connecting to MongoDB...");
        console.log(`📍 Mongo URI: ${mongoURI.includes("mongodb+srv") ? "MongoDB Atlas" : "Local MongoDB"}`);

        // 2️⃣ Connect
        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4, // Force IPv4
        });

        console.log(`✅ MongoDB Connected Successfully`);
        console.log(`🌐 Host: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(`💥 Error: ${error.message}`);

        console.error("\n🔧 Troubleshooting Steps:");
        console.error("1️⃣ Check MongoDB service is running");
        console.error("2️⃣ If Atlas:");
        console.error("   - Whitelist your IP in Network Access");
        console.error("   - Check username & password");
        console.error("   - Ensure cluster is not paused");
        console.error("3️⃣ If Local:");
        console.error("   - Run: mongod");
        console.error("   - Check port 27017");
        console.error("4️⃣ Verify MONGO_URI in .env file\n");

        process.exit(1);
    }
};

module.exports = connectDB;
