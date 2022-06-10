const createImageProperties = (imageId: string, imagePath:string) => {
    const imageMaxSize = `${imagePath}/${imageId}-7x.jpg`;
    const imageMinSize = `${imagePath}/${imageId}-1x.jpg`;

    const image1x = `${imageMinSize} 300w`;
    const image2x = `${imagePath}/${imageId}-2x.jpg 500w`;
    const image3x = `${imagePath}/${imageId}-3x.jpg 750w`;
    const image4x = `${imagePath}/${imageId}-4x.jpg 1000w`;
    const image5x = `${imagePath}/${imageId}-5x.jpg 1300w`;
    const image6x = `${imagePath}/${imageId}-6x.jpg 1600w`;
    const image7x = `${imageMaxSize} 1920w`;

    return {
        imageMaxSize: imageMaxSize,
        imageMinSize: imageMinSize,
        image1x: image1x,
        image2x: image2x,
        image3x: image3x,
        image4x: image4x,
        image5x: image5x,
        image6x: image6x,
        image7x: image7x
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

export { createImageProperties, createVerticalImageProperties };