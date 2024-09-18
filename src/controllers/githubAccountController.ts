
import  GithubAccount from "../models/GithubAccount.js";
import { Request, Response } from "express";


export const createGithubAccount = async (req: Request, res: Response) => {
    try {
        const { username } = await req.body()
        const account = new GithubAccount({username});
        const savedAccount = await account.save({ session: req.dbSession });
        res.status(201).json(savedAccount);

    } catch(err) {
        res.status(500).json({"message": "Error creating Github account: ", err})
    }
}






