


interface Thread {
    id: string;
    object: string;
    created_at: number;
    metadata?: Record<string, any> | unknown ;
    tool_resources: Record<string, any> | null;
    [key: string]: any;
}


export { Thread }