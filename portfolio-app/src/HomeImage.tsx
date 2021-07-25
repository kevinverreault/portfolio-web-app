import React from 'react';
import ResponsiveImage from './ResponsiveImage';

export default class HomeImage extends React.Component <any>{
    alt: string;
    size: string;

    constructor(props: any) {
        super(props);

        this.size = "(max-width:768px) 33vw, 15vw";
        this.alt = `accueil image ${props.imageId}`;
    }

    render() {
        return (
            <ResponsiveImage imageId={this.props.imageId} size={this.size} alt={this.alt} imagePath="images" />
        )
    }
}