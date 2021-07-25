import React from 'react';
import ResponsiveImage from './ResponsiveImage';

export default class GalleryImage extends React.Component <any>{
    alt: string;
    size: string;
    imagePath: string;

    constructor(props: any) {
        super(props);

        this.size = "(max-width:480px) 100vw, (max-width:768px) 224px, 320px";
        this.alt = `${props.galleryName} image ${props.imageId}`;
        this.imagePath= `images/${props.galleryName}`;
    }

    render() {
        return (
            <li><ResponsiveImage imageId={this.props.imageId} size={this.size} alt={this.alt} imagePath={this.imagePath} /></li>
        )
    }
}