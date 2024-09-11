
import GithubAccount from "../models/githubAccount.js";



describe(" github account tests.. ", async () => {

    it("should create a github account model with the username and createdAt fields", async () => {
        const account = new GithubAccount({username: "0xjuju"});
        const savedAccount = await account.save();

        expect(savedAccount).to.have.property("username").equal("0xjuju");
        expect(savedAccount).to.have.property("createdAt");
        expect(savedAccount).to.have.property("updatedAt");
    });
});

