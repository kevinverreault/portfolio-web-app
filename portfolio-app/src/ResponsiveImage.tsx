import React from 'react';
import createImageset from './responsiveImageHelper';

export default class ResponsiveImage extends React.Component<any> {
    imageSet: string;
    imageMaxSize: string;
    imageMinSize: string;

    constructor(props: any) {
        super(props);

        const imageset = createImageset(props.imageId, props.imagePath);

        this.imageSet = `${imageset.image1x}, ${imageset.image2x}, ${imageset.image3x}, ${imageset.image4x}, ${imageset.image5x}`;
        this.imageMaxSize = imageset.imageMaxSize;
        this.imageMinSize = imageset.imageMinSize;
    }
    render() {
        return (
            <a href={this.imageMaxSize} data-fancybox="portfolio">
                <img srcSet={this.imageSet} sizes={this.props.size} src={this.imageMinSize} alt={this.props.alt} />
            </a>
        )
    }
}