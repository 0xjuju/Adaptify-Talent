

/**
 *
 * @property name
 * @property id
 * @property url - GitHub link to the repository
 * @property download_url - link to raw data file
 *
 */

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



