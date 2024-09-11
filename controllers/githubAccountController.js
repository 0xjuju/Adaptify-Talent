
import  GithubAccount from "../models/GithubAccount.js";


export const createGithubAccount = async (req, res) => {
    try {
        const { username } = await req.body()
        const account = new GithubAccount({username});
        const savedAccount = await account.save({ session: req.session });
        res.status(201).json(savedAccount);

    } catch(err) {
        res.status(500).json({"message": "Error creating Github account: ", err})
    }
}






