import dotenv from "dotenv";
dotenv.config();

import githubAccountRoutes from "./routes/githubAccountRoutes.js";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";

const mongoDB = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(sessionMiddleware);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/github-accounts', githubAccountRoutes);

if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV === "production") {
    mongoose.connect(mongoDB)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log("Could not connect to MongoDB", err))

    app.use(express.static(path.join(__dirname, "frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default app;

