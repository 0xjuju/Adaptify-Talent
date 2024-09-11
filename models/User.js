import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    githubAccounts: [{
        "type": Schema.Types.ObjectId,
        "ref": "GithubAccount"
    }]

}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User

