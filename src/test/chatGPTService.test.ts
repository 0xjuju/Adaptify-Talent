
import { createThread } from "../services/chatGPTService.js";


describe("Test OpenAI Functionality", async () => {
    it("should create a thread", async () => {
        const thread = await createThread();
        assert.strictEqual(thread["object"], "thread")
    });


})


