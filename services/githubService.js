
import axios from "axios";

/**
 *
 * @param {string} username - GitHub username
 * @returns {Promise<axios.AxiosResponse<any>>} - List of gitHub repositories that belong to User
 */

export const getRepositoryByUsername = async (username) => {
    try {
        return axios.get(`https://api.github.com/users/${username}/repos`);

    } catch (err) {
        console.log(`error fetching repository for ${username}: ${err.message}`);
        throw new Error("Error getting repo");
    }
}

export const buildFileTree = async (repo) => {
    const fileTree = {};
    for (const item of repo) {
        if (item.type() === "dir") {
            const subDirContents = await axios.get(item.url);
            fileTree[item.name] = await buildFileTree(subDirContents.data);
        } else if (item.type === "file") {
            fileTree[item.name] = { url: item.downloads_url }
        }
    }

    return fileTree;

}



