const createImageProperties = (imageId: string, imagePath:string) => {
    const imageMaxSize = `${imagePath}/${imageId}-6x.jpg`;
    const imageMinSize = `${imagePath}/${imageId}-1x.jpg`;

    const image1x = `${imageMinSize} 320w`;
    const image2x = `${imagePath}/${imageId}-2x.jpg 427w`;
    const image3x = `${imagePath}/${imageId}-3x.jpg 533w`;
    const image4x = `${imagePath}/${imageId}-4x.jpg 683w`;
    const image5x = `${imagePath}/${imageId}-5x.jpg 867w`;
    const image6x = `${imageMaxSize} 1067w`;

    return {
        imageMaxSize: imageMaxSize,
        imageMinSize: imageMinSize,
        image1x: image1x,
        image2x: image2x,
        image3x: image3x,
        image4x: image4x,
        image5x: image5x,
        image6x: image6x
    }
}

const createVerticalImageProperties = (imageId: string, imagePath:string) => {
    const imageMaxSize = `${imagePath}/${imageId}-6x.jpg`;
    const imageMinSize = `${imagePath}/${imageId}-1x.jpg`;

    const image1x = `${imageMinSize} 240w`;
    const image2x = `${imagePath}/${imageId}-2x.jpg 320w`;
    const image3x = `${imagePath}/${imageId}-3x.jpg 400w`;
    const image4x = `${imagePath}/${imageId}-4x.jpg 512w`;
    const image5x = `${imagePath}/${imageId}-5x.jpg 650w`;
    const image6x = `${imageMaxSize} 800w`;

    return {
        imageMaxSize: imageMaxSize,
        imageMinSize: imageMinSize,
        image1x: image1x,
        image2x: image2x,
        image3x: image3x,
        image4x: image4x,
        image5x: image5x,
        image6x: image6x
    }
}

const createHorizontalImageProperties = (imageId: string, imagePath:string) => {
    const imageMaxSize = `${imagePath}/${imageId}-6x.jpg`;
    const imageMinSize = `${imagePath}/${imageId}-1x.jpg`;

    const image1x = `${imageMinSize} 480w`;
    const image2x = `${imagePath}/${imageId}-2x.jpg 640w`;
    const image3x = `${imagePath}/${imageId}-3x.jpg 800w`;
    const image4x = `${imagePath}/${imageId}-4x.jpg 1024w`;
    const image5x = `${imagePath}/${imageId}-5x.jpg 1366w`;
    const image6x = `${imageMaxSize} 1600w`;

    return {
        imageMaxSize: imageMaxSize,
        imageMinSize: imageMinSize,
        image1x: image1x,
        image2x: image2x,
        image3x: image3x,
        image4x: image4x,
        image5x: image5x,
        image6x: image6x
    }
}

export { createImageProperties, createHorizontalImageProperties, createVerticalImageProperties };