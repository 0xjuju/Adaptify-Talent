import User from "../models/User.js";


export const createUser = async (req, res) => {

    try {
        const {name, email} = req.body;
        const newUser = new User({name, email});
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (err) {

        res.status(500).json({"message": "Error creating user: ", err})
    }
};






