import { readdir } from 'fs/promises';
import * as path from 'path';
async function* recursiveFileSearch(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* recursiveFileSearch(res);
        }
        else {
            yield res;
        }
    }
}
async function getFlatFileList(dir) {
    const allFiles = [];
    for await (const localFile of recursiveFileSearch(dir)) {
        allFiles.push(localFile);
    }
    return allFiles;
}
export { recursiveFileSearch, getFlatFileList };
//# sourceMappingURL=utilities.js.map