
import axios from "axios";
import { RepoItem } from "../interfaces/github.interface.js";

export const getRepositoryByUsername = async (username: string) => {
    try {
        return axios.get(`https://api.github.com/users/${username}/repos`);

    } catch (err) {
        console.log(`error fetching repository for ${username}: ${err}`);
        throw new Error("Error getting repo");
    }
}

export const buildFileTree = async (repo: RepoItem[]) => {
    const fileTree: { [key: string]: any } = {};
    for (const item of repo) {
        if (item.type === "dir") {
            const subDirContents = await axios.get(item.url);
            fileTree[item.name] = await buildFileTree(subDirContents.data);
        } else if (item.type === "file") {
            fileTree[item.name] = item.download_url
        }
    }
    return fileTree;
};

export const getRepoContent = async (owner: string, repoName: string) => {
    const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/contents`);

    return data.map((item: RepoItem) => ({
        name: item.name,
        type: item.type,
        url: item.url,
        download_url: item.download_url
    }))
};






