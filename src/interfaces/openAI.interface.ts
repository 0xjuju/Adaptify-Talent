import {OpenAI} from "openai";


export type AssistantTool = OpenAI.Beta.Assistants.AssistantTool;
export type Assistant = OpenAI.Beta.Assistants.Assistant;

interface Thread {
    id: string;
    object: string;
    created_at: number;
    metadata?: Record<string, any> | unknown ;
    tool_resources: Record<string, any> | null;
    [key: string]: any;
}


export { Thread }