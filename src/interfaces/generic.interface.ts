/**
 * Interface representing nested dictionary
 * @property key - field can be either a string or a FileTree Object
 */
interface FileTree {
    [key: string]: FileTree | string;
}

export default FileTree;


