import styled from '@emotion/styled'
import { createImageProperties, createHorizontalImageProperties, createVerticalImageProperties } from './responsiveImageHelper';

const GalleryLink = styled.a`
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

    @media (max-width: 480px) {
        margin: 0 0 0.5rem 0;
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

const HomeGridItem = (props: any) => {
    const size = "(max-width:768px) 33vw, (max-width:1280px) 25vw, 20vw";
    const alt = `accueil image ${props.imageId}`;
    const imagePath = "images";
    let imageProperties = null;
    if (props.horizontal){
        imageProperties = createHorizontalImageProperties(props.imageId, imagePath);
    }  else if (props.vertical) {
        imageProperties = createVerticalImageProperties(props.imageId, imagePath);
    } else {
        imageProperties = createImageProperties(props.imageId, imagePath);
    }

    const imageSet = `${imageProperties.image1x}, ${imageProperties.image2x}, ${imageProperties.image3x}, ${imageProperties.image4x}, ${imageProperties.image5x}, ${imageProperties.image6x}`;

    function handleImageOnLoad() {
        props.onLoad();
    }

    return (
        <GalleryLink href={imageProperties.imageMaxSize} data-fancybox="portfolio">
            <ResponsiveImage srcSet={imageSet} sizes={size} src={imageProperties.imageMinSize} alt={alt} onLoad={handleImageOnLoad.bind(this)} />
        </GalleryLink>
    )
}

export default HomeGridItem;