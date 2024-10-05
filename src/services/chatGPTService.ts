
import { OpenAI } from "openai";
import { Thread } from "../interfaces/openAI.interface.js";

import dotenv from "dotenv";
dotenv.config();


const api = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
})


export const createThread = async (): Promise<Thread> => {
    const thread = api.beta.threads.create();
    console.log(typeof thread);
    return thread
}


