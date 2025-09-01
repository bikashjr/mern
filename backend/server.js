import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = 5001;
const MONGO_URL = "mongodb://localhost:27017/mernStack";

import postRoutes from "./routes/postRoutes.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello world !!!...");
});

app.use('/api/auth', authRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/users', userRoutes);

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
