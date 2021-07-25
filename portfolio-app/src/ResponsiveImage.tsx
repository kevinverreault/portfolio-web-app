import React from 'react';

export default class ResponsiveImage extends React.Component<any> {
    imageSet: string;
    imageMaxSize: string;
    imageMinSize: string;

    constructor(props: any) {
        super(props);
        
        this.imageMaxSize = `${props.imagePath}/${props.imageId}-5x.jpg`;
        this.imageMinSize = `${props.imagePath}/${props.imageId}-1x.jpg`;

        const image1x = `${this.imageMinSize} 320w`;
        const image2x = `${props.imagePath}/${props.imageId}-2x.jpg 640w`;
        const image3x = `${props.imagePath}/${props.imageId}-3x.jpg 1024w`;
        const image4 = `${props.imagePath}/${props.imageId}-4x.jpg 1366w`;
        const image5x = `${this.imageMaxSize} 1600w`;
        // const image1x = `${process.env.PUBLIC_URL}/images/${props.imageId}-1x.jpg 320w`;
        // const image2x = `${process.env.PUBLIC_URL}/images/${props.imageId}-2x.jpg 640ww`;
        // const image3x = `${process.env.PUBLIC_URL}/images/${props.imageId}-3x.jpg 1024w`;
        // const image4 = `${process.env.PUBLIC_URL}/images/${props.imageId}-4x.jpg 1366w`;
        // const image5x = `${process.env.PUBLIC_URL}/images/${props.imageId}-5x.jpg 1600w`;
        this.imageSet = `${image1x}, ${image2x}, ${image3x}, ${image4}, ${image5x}`;
    }
    render() {
        return (
            <a href={this.imageMaxSize} data-fancybox="portfolio">
                <img srcSet={this.imageSet} sizes={this.props.size} src={this.imageMinSize} alt={this.props.alt} />
            </a>
        )
    }
}