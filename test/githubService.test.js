
import { getRepositoryByUsername } from "../services/githubService.js";

describe("Test github service return values", async () => {

    it("should return a list of projects from the user's github repositories", async () => {

        const projects = await getRepositoryByUsername("0xjuju");
        expect(projects).to.have.property("statusText").equal("OK")
        expect(projects).to.have.property("data")
        projects["data"].forEach( (item) => {
            expect(item).to.have.property("id")
            if (item["id"] === 752421953) {
                expect(item["url"]).to.equal("https://api.github.com/repos/0xjuju/Agent-TwitStor")
            }
        })
    });
});








