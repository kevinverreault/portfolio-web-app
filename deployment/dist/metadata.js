import * as exif from 'exif-parser';
import * as path from 'path';
import * as fs from 'fs';
import { getFlatFileList } from './utilities.mjs';
await main();
async function main() {
    try {
        const publicPath = path.resolve('../portfolio-app');
        const imagesPath = path.resolve('../portfolio-app/public/images/1x');
        console.log('generating metadata');
        const images = await getFlatFileList(imagesPath);
        const imagesMetadata = buildMetadataFromExif(imagesPath, images);
        console.log(imagesMetadata);
        fs.writeFileSync(`${publicPath}/src/metadata.json`, JSON.stringify(Object.fromEntries(imagesMetadata)), 'utf-8');
    }
    catch (exception) {
        console.log(exception);
    }
}
function buildMetadataFromExif(imagesPath, images) {
    const imagesMetadata = new Map();
    for (const image of images) {
        try {
            const exifData = exif.create(fs.readFileSync(image)).parse();
            const description = exifData.tags.ImageDescription;
            const dateTaken = exifData.tags.DateTimeOriginal;
            if (description) {
                const imageKey = image.replace(imagesPath, '').replace('.jpg', '').replace('\\', '');
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
//# sourceMappingURL=metadata.js.map