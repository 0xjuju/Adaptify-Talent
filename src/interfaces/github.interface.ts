
interface RepoProject {
    name: string;
    id: number;
    url: string;
    download_url: string;
}

interface RepoItem {
    name: string;
    type: string;
    url: string;
    download_url: string;
}

export { RepoItem, RepoProject };



