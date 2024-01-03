/** @module download-git-repo */
/**
 * Optional Options used for downloading a git repo
 */
interface Opts {
    /**
     * Whether or not to use "git clone" command for downloading this repo
     */
    clone: boolean,
    /**
     * What HTTP headers to use for this request
     */
    headers: Object
}
declare module 'download-git-repo' {
    /**
     * Downloads a git repo
     * @param repo - Name of the repo to download
     * @param dest - Folder destination
     * @param fn - Callback function
     */
    function download(repo: string, dest: string, fn: (err: Error) => void): void
    /**
     * Downloads a git repo
     * @param repo - Name of the repo to download
     * @param dest - Folder destination
     * @param opts - Options for downloading this repo
     * @param fn - Callback function
     */
    function download(repo: string, dest: string, opts: Opts, fn: (err: Error) => void): void
    export default download
}
