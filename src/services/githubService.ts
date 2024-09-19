
import axios from "axios";
import { RepoItem } from "../interfaces/github.interface.js";

/**
 * Retrieve gitHub repo by username
 *
 * @param username - Username associated with repository
 * @returns Repository of a user
 */

export const getRepositoryByUsername = async (username: string): Promise<RepoItem[]> => {
    try {
        return axios.get(`https://api.github.com/users/${username}/repos`);


    } catch (err) {
        console.log(`error fetching repository for ${username}: ${err}`);
        throw new Error("Error getting repo");
    }
}

/**
 * Build a tree map of the repository file directory
 *
 * @param repo - list of repository files and directories
 *
 * @returns file structure as dictionary
 */

export const buildFileTree = async (repo: RepoItem[]): Promise<{ [key: string]: string }> => {
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

/**
 *
 *
 * @param owner - Owner of the repository
 * @param repoName - Name of the specific repository to analyze
 *
 * @returns list of objects in repo
 */

export const getRepoContent = async (owner: string, repoName: string): Promise<RepoItem[]> => {
    const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/contents`);

    return data.map((item: RepoItem) => ({
        name: item.name,
        type: item.type,
        url: item.url,
        download_url: item.download_url
    }))
};






