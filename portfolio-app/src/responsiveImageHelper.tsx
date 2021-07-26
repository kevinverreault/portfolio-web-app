import React from 'react';

const createImageset = (imageId: string, imagePath:string) => {
    const imageMaxSize = `${imagePath}/${imageId}-5x.jpg`;
    const imageMinSize = `${imagePath}/${imageId}-1x.jpg`;

    const image1x = `${imageMinSize} 320w`;
    const image2x = `${imagePath}/${imageId}-2x.jpg 640w`;
    const image3x = `${imagePath}/${imageId}-3x.jpg 1024w`;
    const image4x = `${imagePath}/${imageId}-4x.jpg 1366w`;
    const image5x = `${imageMaxSize} 1600w`;

    // const image1x = `${process.env.PUBLIC_URL}/images/${props.imageId}-1x.jpg 320w`;
    // const image2x = `${process.env.PUBLIC_URL}/images/${props.imageId}-2x.jpg 640ww`;
    // const image3x = `${process.env.PUBLIC_URL}/images/${props.imageId}-3x.jpg 1024w`;
    // const image4 = `${process.env.PUBLIC_URL}/images/${props.imageId}-4x.jpg 1366w`;
    // const image5x = `${process.env.PUBLIC_URL}/images/${props.imageId}-5x.jpg 1600w`;

    return {
        imageMaxSize: imageMaxSize,
        imageMinSize: imageMinSize,
        image1x: image1x,
        image2x: image2x,
        image3x: image3x,
        image4x: image4x,
        image5x: image5x
    }
}

export default createImageset;