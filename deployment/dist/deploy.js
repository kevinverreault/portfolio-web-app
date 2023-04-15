import jsftp from 'jsftp';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { hasProcessArgument, recursiveFileSearch } from './utilities';
const sourceSetSize = 7;
const SOURCE = "./public_html";
const TEMP = "_temp";
const TO_DELETE = "_todelete";
const IMAGES_DIRECTORY = "images";
const STATIC_DIRECTORY = "static";
const EXCLUSIONS = ['.htaccess', '.well-known', 'cgi-bin', 'fonts', '1x', '2x', '3x', '4x', '5x', '6x', '7x', 'images', 'images_temp', 'static'];
main();
async function main() {
    try {
        dotenv.config();
        const uploadSourcesOnly = hasProcessArgument('-s');
        await uploadBuildOutput(uploadSourcesOnly);
    }
    catch (exception) {
        console.log(exception);
    }
}
async function uploadBuildOutput(uploadSourcesOnly) {
    const sourceFiles = [];
    const images = [];
    const buildRelativePath = '../portfolio-app/build';
    const buildPath = path.resolve(buildRelativePath);
    const createPaths = (f) => ({
        source: f,
        destination: f.replace(buildPath, '').replace(IMAGES_DIRECTORY, `${IMAGES_DIRECTORY}${TEMP}`)
    });
    for await (const localFile of recursiveFileSearch(buildRelativePath)) {
        if (localFile.includes(IMAGES_DIRECTORY)) {
            images.push(createPaths(localFile));
        }
        else {
            sourceFiles.push(createPaths(localFile));
        }
    }
    const ftpClient = new jsftp({
        host: process.env.FTP_HOST,
        port: 21,
        user: process.env.FTP_USERNAME,
        pass: process.env.FTP_PASSWORD
    });
    ftpClient.auth(process.env.FTP_USERNAME, process.env.FTP_PASSWORD, async () => {
        if (!uploadSourcesOnly) {
            await stageTempDirectories(ftpClient);
            await uploadDirectory(ftpClient, images);
        }
        await cleanupSource(ftpClient);
        await uploadDirectory(ftpClient, sourceFiles);
        if (!uploadSourcesOnly) {
            await swapImagesDirectories(ftpClient);
            await cleanupOldImages(ftpClient);
        }
        quit(ftpClient);
    });
}
async function uploadDirectory(ftpClient, files) {
    console.log('upload started');
    try {
        for (const file of files) {
            await put(ftpClient, file.source, file.destination.split('\\').join('/'));
        }
        console.log('upload finished');
    }
    catch (err) {
        console.log(err);
        console.log('upload error');
    }
}
async function stageTempDirectories(ftpClient) {
    console.log('staging temp folders');
    try {
        await createDirectory(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TEMP}`);
        for (let i = 1; i <= sourceSetSize; ++i) {
            await createDirectory(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TEMP}/${i}x`);
        }
        console.log('staging finished');
    }
    catch (err) {
        console.log(err);
        console.log('staging failed');
    }
}
async function cleanupSource(ftpClient) {
    try {
        console.log('cleanup source started');
        await emptyDirectory(ftpClient, `${SOURCE}/${STATIC_DIRECTORY}/js`);
        await emptyDirectory(ftpClient, `${SOURCE}/${STATIC_DIRECTORY}/css`);
        await emptyDirectory(ftpClient, `${SOURCE}`);
        console.log("cleanup finished");
    }
    catch (exception) {
        console.log('cleanup failed');
    }
}
async function cleanupOldImages(ftpClient) {
    try {
        console.log('cleanup started');
        for (let i = 1; i <= sourceSetSize; ++i) {
            await emptyDirectory(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TO_DELETE}/${i}x`);
            await deleteDirectory(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TO_DELETE}/${i}x`);
        }
        await emptyDirectory(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TO_DELETE}`);
        await deleteDirectory(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TO_DELETE}`);
        console.log("cleanup finished");
    }
    catch (exception) {
        console.log('cleanup failed');
    }
}
async function swapImagesDirectories(ftpClient) {
    try {
        console.log('swapping images directory');
        await rename(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}`, `${SOURCE}/${IMAGES_DIRECTORY}${TO_DELETE}`);
        await rename(ftpClient, `${SOURCE}/${IMAGES_DIRECTORY}${TEMP}`, `${SOURCE}/${IMAGES_DIRECTORY}`);
        console.log("swapping finished");
    }
    catch (exception) {
        console.log('swapping images directory failed');
    }
}
async function put(ftpClient, sourcePath, destinationPath) {
    console.log(`put ${sourcePath} to ${SOURCE}${destinationPath}`);
    let buffer = fs.readFileSync(sourcePath);
    await new Promise((resolve, reject) => {
        ftpClient.put(buffer, `${SOURCE}${destinationPath}`, err => {
            if (err) {
                reject();
                return console.log(err);
            }
            console.log(`${destinationPath} transferred successfully`);
            resolve();
        });
    });
}
async function emptyDirectory(ftpClient, directory) {
    try {
        await new Promise((resolve, reject) => {
            ftpClient.ls(directory, (err, res) => {
                if (err) {
                    console.log('ls error: ' + err);
                    reject();
                    return;
                }
                res.forEach(async (file) => {
                    if (EXCLUSIONS.findIndex((exlusion) => exlusion === file.name) < 0) {
                        await deleteFile(ftpClient, `${directory}/${file.name}`);
                    }
                });
                resolve();
            });
        });
    }
    catch (exception) {
        console.log("emptyDirectory error: " + directory);
    }
}
async function createDirectory(ftpClient, path) {
    try {
        await new Promise((resolve, reject) => {
            ftpClient.raw('mkd', path, asyncCallback(resolve, reject));
        });
    }
    catch (error) {
        console.log(`mkdir error: ${path}, error: ${error}`);
    }
}
async function deleteDirectory(ftpClient, path) {
    try {
        await new Promise((resolve, reject) => {
            ftpClient.raw('rmd', path, asyncCallback(resolve, reject));
        });
    }
    catch (error) {
        console.log(`rmdir error: ${path}, error: ${error}`);
    }
}
async function deleteFile(ftpClient, path) {
    try {
        await new Promise((resolve, reject) => {
            ftpClient.raw('dele', path, asyncCallback(resolve, reject));
        });
    }
    catch (error) {
        console.log(`remove error: ${path}, error: ${error}`);
    }
}
async function rename(ftpClient, from, to) {
    try {
        await new Promise((resolve, reject) => {
            ftpClient.raw('rnfr', from, asyncCallback(resolve, reject));
        });
        await new Promise((resolve, reject) => {
            ftpClient.raw('rnto', to, asyncCallback(resolve, reject));
        });
    }
    catch (error) {
        console.log(`rename error: ${from} to ${to}, error: ${error}`);
    }
}
function asyncCallback(resolve, reject) {
    return (err) => {
        if (err) {
            reject();
            return console.error(err);
        }
        resolve();
    };
}
function quit(ftpClient) {
    ftpClient.raw("quit", (err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log("ending ftp connection");
    });
}
//# sourceMappingURL=deploy.js.map