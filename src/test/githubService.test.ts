import { RepoProject } from "../interfaces/github.interface.js";
import { buildFileTree, getRepositoryByUsername, getRepoContent } from "../services/githubService.js";
import assert from "assert";

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
        const files = await getRepoContent("0xjuju", "CopyTrader");
        const tree = await buildFileTree(files);
        assert("algorithms" in tree);
        assert("manage.py" in tree);
        assert.strictEqual(tree["blockchain"]["management"]["commands"]["create_webhooks_for_wallet.py"],
            "https://raw.githubusercontent.com/0xjuju/CopyTrader/master/blockchain/management/commands/create_webhooks_for_wallet.py");
    });

    it("should return a list of file directories for a github repository", async () => {
        const files = await getRepoContent("0xjuju", "CopyTrader");
        assert( "url" in files[0]);
        assert( "type" in files[1]);
        assert.strictEqual(files[0]["name"], ".gitignore");
    });
});








