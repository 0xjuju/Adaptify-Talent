import { RepoProject } from "../interfaces/github.interface.js";
import { getRepositoryByUsername } from "../services/githubService.js";

describe("Test github service return values", async () => {

    it("should return a list of projects from the user's github repositories", async () => {

        const projects = await getRepositoryByUsername("0xjuju");
        assert("statusText" in projects);
        assert(projects["statusText"] === "OK");
        assert("data" in projects);
        projects["data"].forEach( (item: RepoProject) => {
            assert("id" in item)
            if (item["id"] === 752421953) {
                assert(item["url"] === "https://api.github.com/repos/0xjuju/Agent-TwitStor")
            }
        })
    });

    it("should return a dictionary file map of the directory", async () => {
        const project = ""
    });
});








