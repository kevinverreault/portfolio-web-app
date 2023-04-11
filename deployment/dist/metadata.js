import * as exif from 'exif-parser';
import * as path from 'path';
import * as fs from 'fs';
import { getFlatFileList } from './utilities';
main();
async function main() {
    try {
        const publicPath = path.resolve('../portfolio-app');
        const imagesPath = path.resolve('../portfolio-app/public/images/7x');
        console.log('generating metadata');
        const images = await getFlatFileList(imagesPath);
        const imagesMetadata = getDescriptionFromExif(imagesPath, images);
        console.log(imagesMetadata);
        fs.writeFileSync(`${publicPath}/src/metadata.json`, JSON.stringify(Object.fromEntries(imagesMetadata)), 'utf-8');
    }
    catch (exception) {
        console.log(exception);
    }
}
function getDescriptionFromExif(imagesPath, images) {
    const imagesMetadata = new Map();
    for (const image of images) {
        const exifdata = exif.create(fs.readFileSync(image));
        try {
            const description = exifdata.parse().tags['ImageDescription'];
            if (description) {
                const imageKey = image.replace(imagesPath, '').replace('.jpg', '').replace('\\', '');
                imagesMetadata.set(imageKey, description);
            }
        }
        catch (error) {
            console.log(`failed to get exif for ${image}, error: ${error}`);
        }
    }
    return imagesMetadata;
}
//# sourceMappingURL=metadata.js.map