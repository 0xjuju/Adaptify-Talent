
import GithubAccount from "../models/GithubAccount.js";


describe(" github account tests.. ", async () => {

    it("should create a github account model with the username and createdAt fields", async () => {
        const account = new GithubAccount({username: "0xjuju"});
        const savedAccount = await account.save();

        assert("username" in savedAccount);
        assert(savedAccount["username"] === "0xjuju");
        assert("createdAt" in savedAccount);
        assert("updatedAt" in savedAccount);
    });
});

