import * as path from 'path';
import * as fs from 'fs';
const IMAGES_IMPORT_PATH = '../image-sources/';
const IMAGES_SOURCE_PATH = 'C:\\Users\\Kevin\\Pictures\\JPEG\\Autre\\siteweb';
const IMAGE_SUB_PATH = '2000w';
const SIZES = ['1750w', '1500w', '1250w', '1000w', '750w', '500w', '250w'];
const QUALITY = ['87.5', '75', '62.5', '50', '37.5', '25', '12.5'];
main();
function main() {
    importImagesFrom('thumbnail');
    importImagesFrom('fullsize');
}
function importImagesFrom(imageFormat) {
    const imagesPath = path.resolve(`${IMAGES_IMPORT_PATH}/${imageFormat}/${IMAGE_SUB_PATH}`);
    const exportPath = `${IMAGES_SOURCE_PATH}\\${imageFormat}\\${IMAGE_SUB_PATH}`;
    console.log(`refreshing folder ${exportPath} into sources ${imagesPath}`);
    fs.rmSync(imagesPath, { recursive: true, force: true });
    fs.mkdirSync(imagesPath, { recursive: true });
    copyDirectory(exportPath, imagesPath);
}
function copyDirectory(source, destination) {
    let entries = fs.readdirSync(source, { withFileTypes: true });
    for (let entry of entries) {
        let sourcePath = path.join(source, entry.name);
        let destinationPath = path.join(destination, entry.name.toLowerCase());
        fs.copyFileSync(sourcePath, destinationPath);
    }
}
//# sourceMappingURL=image-utilities.js.map