
import axios from "axios";


export const getRepositoryByUsername = async (username) => {
    try {
        return axios.get(`https://api.github.com/users/${username}/repos`);

    } catch (err) {
        console.log(`error fetching repository for ${username}: ${err.message}`);
        throw new Error("Error getting repo");
    }
}





