import dotenv from "dotenv";
dotenv.config();


import githubAccountRoutes from "./routes/githubAccountRoutes.js";
import express, { Application } from "express";
import mongoose from "mongoose";
import path from "path";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";


const mongoDB = process.env.MONGODB_URI || "";

if (mongoDB === "") {
    throw new Error("Problem connecting to mongodb");
}

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(sessionMiddleware);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/github-accounts', githubAccountRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


if (process.env.NODE_ENV !== "test") {
    mongoose.connect(mongoDB)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log("Could not connect to MongoDB", err))

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default app;

