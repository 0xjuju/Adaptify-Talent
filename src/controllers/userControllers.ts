import User from "../models/User.js";
import { Request, Response  } from "express";


export const createUser = async (req: Request, res: Response) => {

    try {
        const {name, email} = req.body;
        const newUser = new User({ name: name, email: email });
        const savedUser = await newUser.save( {session: req.dbSession });

        res.status(201).json(savedUser);

    } catch (err) {

        res.status(500).json({"message": "Error creating user: ", err})
    }
};






