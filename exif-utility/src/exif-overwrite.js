"use strict";
var fs = require("fs");
var path = require('path');
var piexif = require("piexifjs");
main();
function main() {
    const imageFolder = '1x';
    const tempFolder = '1x_temp';
    const sourceFolder = '../portfolio-app/public/images/';
    const imagesPath = path.resolve(`${sourceFolder}${imageFolder}`);
    const tempPath = path.resolve(`${sourceFolder}${tempFolder}`);
    fs.mkdirSync(tempPath);
    let entries = fs.readdirSync(imagesPath, { withFileTypes: true });
    for (const entry of entries) {
        const image = path.join(imagesPath, entry.name);
        console.log(`overwriting exif for ${image}`);
        const data = fs.readFileSync(image).toString('binary');
        const exifBytes = piexif.dump({ "0th": {}, "Exif": {}, "GPS": {} });
        var overwrittenData = piexif.insert(exifBytes, data);
        var sanitizedJpeg = Buffer.from(overwrittenData, "binary");
        fs.writeFileSync(image.replace(imageFolder, tempFolder), sanitizedJpeg);
    }
    fs.rmSync(imagesPath, { recursive: true, force: true });
    fs.renameSync(tempPath, imagesPath);
    console.log('exif-overwrite completed');
}
