import dotenv from "dotenv";
dotenv.config();

import githubAccountRoutes from "./routes/githubAccountRoutes.js";
import express from "express";
import mongoose from "mongoose";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import userRoutes from "./routes/userRoutes.js";


const mongoDB = process.env.MONGODB_URI;
const app = express();
const port = 3000;


app.use(sessionMiddleware);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/github-accounts', githubAccountRoutes);

app.get("/", async (req, res) => {
    res.send("Hello World! I'm a basic node server")
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

