import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const PORT = 5001;
const MONGO_URL = "mongodb://localhost:27017/mernStack";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello world !!!...");
});

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
    }
};

startServer();

// Mongoose connection logs
mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongoose disconnected");
});
