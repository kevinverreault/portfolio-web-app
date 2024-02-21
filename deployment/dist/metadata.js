import * as exif from "exif-parser";
import * as path from "path";
import * as fs from "fs";
await main();
async function main() {
    try {
        const publicPath = path.resolve("./");
        const imagesPath = "../image-sources/fullsize/250w";
        const jsonFilePath = path.resolve(`${publicPath}/metadata.json`);
        const data = fs.readFileSync(jsonFilePath, "utf8");
        let jsonData = JSON.parse(data);
        jsonData.albums.forEach((album) => {
            album.photos.sort((a, b) => a.order - b.order);
            album.photos.forEach((photo) => {
                photo.metadata = getImageMetadata(imagesPath, photo.id);
            });
        });
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(jsonFilePath, updatedJsonData, "utf8");
        console.log("JSON data updated successfully.");
    }
    catch (err) {
        console.error("Error processing the JSON file:", err);
    }
}
function getImageMetadata(imageDirectory, imageName) {
    const imagePath = path.resolve(imageDirectory, imageName + ".jpg");
    try {
        const exifData = exif.create(fs.readFileSync(imagePath)).parse();
        let imageDescription = exifData.tags.ImageDescription;
        const dateTaken = exifData.tags.DateTimeOriginal;
        if (imageDescription) {
            imageDescription = imageDescription +
                (dateTaken ? ` - ${new Date(dateTaken * 1000).getFullYear()}` : "");
            return {
                description: imageDescription
            };
        }
    }
    catch (error) {
        console.log(`failed to get exif for ${imagePath}, error: ${error}`);
    }
}
//# sourceMappingURL=metadata.js.map