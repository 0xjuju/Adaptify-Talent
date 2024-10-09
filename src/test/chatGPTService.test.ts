import { AssistantTool } from "../interfaces/openAI.interface.js";
import { createAssistant, createThread } from "../services/chatGPTService.js";


describe("Test OpenAI Functionality", async () => {

    it("should create a thread", async () => {
        const thread = await createThread();
        assert.strictEqual(thread["object"], "thread")
    });

    it("should create an assistant agent", async () => {

        const tools: AssistantTool[] = [{"type": "code_interpreter"}];

        const agent = await createAssistant("Math Tutor", "Answer math problems, followed by a joke", "Funny Math Tutor", "gpt-4o", tools );
        assert.strictEqual(agent["object"], "assistant")
    })
})


