import mongoose from "mongoose";

const { Schema } = mongoose;

const GithubAccountSchema = new Schema({
    "username": {
        type: String,
        unique: true,
        required: true,
    },

    users: [{
        "type": Schema.Types.ObjectId,
        "ref": "User"
    }]
}, {"timestamps": true});

const GithubAccount = mongoose.models.GithubAccount || mongoose.model("GithubAccount", GithubAccountSchema);

export default GithubAccount;





