
interface RepoProject {
    name: string;
    id: number;
    url: string;
    downloads_url?: string;
}

interface RepoItem {
    name: string;
    type: string;
    url: string;
    downloads_url?: string;
}

export { RepoItem, RepoProject };



