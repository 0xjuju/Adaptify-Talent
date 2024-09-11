
import GithubAccount from "../models/GithubAccount.js";
import updateManyToManyRelationship from "../services/updateRelatedModels.js";
import User from "../models/User.js";



describe("Test Related model updates", async () => {

    it("Should update both sides of a Many to Many relationship", async () => {
        const userId = testUser._id;
        const githubAccountId = testGithubAccount._id;

        expect(testUser.githubAccounts).to.not.includes(githubAccountId);
        expect(testGithubAccount.users).to.not.includes(userId);

        await updateManyToManyRelationship(
            testUser,
            "githubAccounts",
            testGithubAccount,
            "users"
        );

        expect(testUser.githubAccounts).to.includes(githubAccountId);
        expect(testGithubAccount.users).to.includes(userId);

    });
})









