import express from "express";


export const createPostRoute = (model) => {
    const router = express.Router();
    router.post("/", model);
    return router;
}








