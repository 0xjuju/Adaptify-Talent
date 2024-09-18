
import updateManyToManyRelationship from "../services/updateRelatedModels.js";
import githubAccount from "../models/GithubAccount.js";


describe("Test Related model updates", async () => {

    it("Should update both sides of a Many to Many relationship", async () => {
        const userId = testUser._id;
        const githubAccountId = testGithubAccount._id;

        assert.ok(!testUser.githubAccounts.includes(githubAccountId));
        assert.ok(!testGithubAccount.users.includes(userId));


        await updateManyToManyRelationship(
            testUser,
            "githubAccounts",
            testGithubAccount,
            "users"
        );

        assert.ok(testUser.githubAccounts.includes(githubAccountId));
        assert.ok(testGithubAccount.users.includes(userId));

    });
})









