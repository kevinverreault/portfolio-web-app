"use strict";
var fs = require("fs");
var path = require('path');
var piexif = require("piexifjs");
const tempSuffix = '_temp';
const toDeleteSuffix = '_todelete';
const formatPlaceholder = '-format-';
const sourceFolder = `../image-sources/${formatPlaceholder}/250w`;
main();
function main() {
    overwriteFilesInDirectory(path.resolve(sourceFolder.replace(formatPlaceholder, 'thumbnail')));
    overwriteFilesInDirectory(path.resolve(sourceFolder.replace(formatPlaceholder, 'fullsize')));
    console.log('exif-overwrite completed');
}
function overwriteFilesInDirectory(imagesPath) {
    let entries = fs.readdirSync(imagesPath, { withFileTypes: true });
    for (const entry of entries) {
        const image = path.join(imagesPath, entry.name);
        console.log(`overwriting exif for ${image}`);
        const data = fs.readFileSync(image).toString('binary');
        const exifBytes = piexif.dump({ "0th": {}, "Exif": {}, "GPS": {} });
        var overwrittenData = piexif.insert(exifBytes, data);
        var sanitizedJpeg = Buffer.from(overwrittenData, "binary");
        const tempName = image + tempSuffix;
        const toDelete = image + toDeleteSuffix;
        fs.writeFileSync(tempName, sanitizedJpeg);
        fs.renameSync(image, toDelete);
        fs.renameSync(tempName, image);
        fs.rmSync(toDelete);
    }
}
