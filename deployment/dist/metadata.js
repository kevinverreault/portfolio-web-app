import * as exif from 'exif-parser';
import * as path from 'path';
import * as fs from 'fs';
import { getFlatFileList } from './utilities.mjs';
await main();
async function main() {
    try {
        const publicPath = path.resolve('./portfolio-app');
        const imagesPath = path.resolve('./image-sources/fullsize/250w');
        console.log('generating metadata');
        const images = await getFlatFileList(imagesPath);
        const imagesMetadata = getImagesMetadata(imagesPath, images);
        const pagesMetadata = getPagesMetadata(imagesMetadata);
        console.log(imagesMetadata);
        fs.writeFileSync(`${publicPath}/src/images-metadata.json`, JSON.stringify(Object.fromEntries(imagesMetadata)), 'utf-8');
        fs.writeFileSync(`${publicPath}/src/pages-metadata.json`, JSON.stringify(Object.fromEntries(pagesMetadata)), 'utf-8');
    }
    catch (exception) {
        console.log(exception);
    }
}
function getImagesMetadata(imagesPath, images) {
    const imagesMetadata = new Map();
    for (const image of images) {
        try {
            const exifData = exif.create(fs.readFileSync(image)).parse();
            const description = exifData.tags.ImageDescription;
            const dateTaken = exifData.tags.DateTimeOriginal;
            if (description) {
                const imageKey = image.replace(imagesPath, '')
                    .replace('.jpg', '')
                    .replace('\\', '');
                const caption = description + (dateTaken ? ` - ${new Date(dateTaken * 1000).getFullYear()}` : '');
                imagesMetadata.set(imageKey, caption);
            }
        }
        catch (error) {
            console.log(`failed to get exif for ${image}, error: ${error}`);
        }
    }
    return imagesMetadata;
}
function getPagesMetadata(imagesMetadata) {
    const pagesMetadata = new Map();
    for (let image of Array.from(imagesMetadata.keys())) {
        const albumKey = image.split('_')[0];
        if (!pagesMetadata.has(albumKey)) {
            pagesMetadata.set(albumKey, 0);
        }
        pagesMetadata.set(albumKey, pagesMetadata.get(albumKey) + 1);
    }
    return pagesMetadata;
}
//# sourceMappingURL=metadata.js.map