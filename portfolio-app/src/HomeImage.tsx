import React from 'react';
import createImageset from './responsiveImageHelper';
import styled from "styled-components";

// const HomeLink = styled.a`
//     margin: 0 0 2em 0;
//     transition: all .2s ease;
//     border-bottom: 0;
//     display: block;
//     width: 100%;
//     text-align: center;
//     border-radius: 2px;
//     box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
//     background-color: rgba(255, 255, 255, 0.075);
//     cursor: pointer;
//     outline: 0;
//     overflow: hidden;
//     @media (max-width:1280px) {
//         margin: 0 0 1.5rem 0;
//     }
//     @media (max-width:768px) {
//         margin: 0 0 1rem 0;
//     }

//     :hover {
//         background-color: rgba(255, 255, 255, 0.25);
//         box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 .5em 0 #37474f;
//         opacity: 90%;
//     }
// `;

const HomeLink = styled.a`
    margin: 0 0 2em 0;
    transition: all .2s ease;
    display: block;
    width: 100%;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
    @media (max-width:1280px) {
        margin: 0 0 1.5rem 0;
    }
    @media (max-width:768px) {
        margin: 0 0 1rem 0;
    }

    :hover {
        background-color: rgba(255, 255, 255, 0.25);
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 .5em 0 #37474f;
        opacity: 90%;
    }
`;

const ResponsiveImage = styled.img`
    display: block;
    width: 100%;
    image-rendering: -webkit-optimize-contrast;
`;

export default class HomeImage extends React.Component <any>{
    alt: string;
    size: string;
    imageSet: string;
    imageMaxSize: string;
    imageMinSize: string;

    constructor(props: any) {
        super(props);

        this.size = "(max-width:768px) 33vw, (max-width:1280px) 25vw, 15vw";
        this.alt = `accueil image ${props.imageId}`;
        const imagePath = "images";
        const imageset = createImageset(props.imageId, imagePath);

        this.imageSet = `${imageset.image1x}, ${imageset.image2x}, ${imageset.image3x}, ${imageset.image4x}, ${imageset.image5x}`;
        this.imageMaxSize = imageset.imageMaxSize;
        this.imageMinSize = imageset.imageMinSize;
    }

    render() {
        return (
            <HomeLink href={this.imageMaxSize} data-fancybox="portfolio">
                <ResponsiveImage srcSet={this.imageSet} sizes={this.size} src={this.imageMinSize} alt={this.alt} />
            </HomeLink>
        )
    }
}