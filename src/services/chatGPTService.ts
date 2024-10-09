
import { OpenAI } from "openai";
import { Assistant, AssistantTool, Thread } from "../interfaces/openAI.interface.js";


import dotenv from "dotenv";
dotenv.config();


const api = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
})


export const createThread = async (): Promise<Thread> => {
    const thread = await api.beta.threads.create();
    console.log(typeof thread);
    return thread
}

/**
 *
 * @param name - Name of assistant
 * @param instructions - Instructions for assistant agent to follow
 * @param description - High level overview of what the assistant does
 * @param model - Model type https://platform.openai.com/docs/models
 * @param tools - Tools for assistant to use. code_interpreter, file_search, or function > https://platform.openai.com/docs/assistants/tools
 */
export const createAssistant = async (name: string, instructions: string, description: string, model: string, tools: AssistantTool[]): Promise<Assistant> => {


    return api.beta.assistants.create({
        name,
        instructions,
        model,
        tools
    });
}