const sharp = require("sharp");
const path = require('path');
const fs = require('fs');

const sourceImageDirectory = "../../public/images/person/";
const destinationImageDirectory = "../../public/images/example/";
const sourcePath = path.join(__dirname, sourceImageDirectory);
const destinationPath = path.join(__dirname, destinationImageDirectory);
const sourceImages = fs.readdirSync(sourcePath);

let numFinished = 0;
const logProgress = () => {
    const progress = Math.round((numFinished / sourceImages.length) * 100);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Processing ${progress}%`);
}

const transformImage = async (filename) => {
    const scale = 0.1;
    const blur = 20;
    const image = sharp(sourcePath + filename);
    const metadata = await image.metadata();

    image
        .withMetadata()
        .resize(Math.round(metadata.width * scale), Math.round(metadata.height * scale))
        .blur(blur)
        .normalise()
        .toFile(destinationPath + filename, (err, info) => {
            if (err) {
                console.log(err);
            }
            logProgress(++numFinished);
            if(numFinished === sourceImages.length)
                console.log("\nDone!");
        }
    );
}

sourceImages.forEach(transformImage);

console.log("Spawned " + sourceImages.length + " processes");