import React from 'react';
import createImageset from './responsiveImageHelper';
import styled from '@emotion/styled'

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

const HomeImage = (props: any) => {
    const size = "(max-width:768px) 33vw, (max-width:1280px) 25vw, 15vw";
    const alt = `accueil image ${props.imageId}`;
    const imagePath = "images";
    const imageset = createImageset(props.imageId, imagePath);

    const imageSet = `${imageset.image1x}, ${imageset.image2x}, ${imageset.image3x}, ${imageset.image4x}, ${imageset.image5x}`;
    const imageMaxSize = imageset.imageMaxSize;
    const imageMinSize = imageset.imageMinSize;

    return (
        <HomeLink href={imageMaxSize} data-fancybox="portfolio">
            <ResponsiveImage srcSet={imageSet} sizes={size} src={imageMinSize} alt={alt} />
        </HomeLink>
    )
}

export default HomeImage;