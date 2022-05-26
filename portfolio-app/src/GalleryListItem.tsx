import styled from '@emotion/styled'
import ResponsiveImage from './ResponsiveImage';
import { createImageProperties } from './responsiveImageHelper';

const ListItem = styled.li`
    display: inline-block;
    transition: all .2s ease;
    box-sizing: border-box;
    @media (max-width: 480px) {
        display: list-item;
        padding: 2px;
    }
`;

const GalleryLink = styled.a`
    width: 320px;
    box-sizing: border-box;
    display: block;
    margin: 0 10px 20px 10px;
    :hover {
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 6px 0 #37474f;
        opacity: 90%;
     }
     @media (max-width: 768px) { 
        width: 200px;
    }
    @media (max-width: 480px) {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
    }
`;

const imageStyle = {
    width: '100%',
    borderRadius: "2px",
    imageRendering: "-webkit-optimize-contrast",
    boxSizing: "border-box"
}

const GalleryListItem = (props: any) => {
    const sizes = "(max-width:480px) 80vw, (max-width:768px) 200px, 320px";
    const alt = `${props.galleryName} image ${props.imageId}`;
    const imagePath= `images/${props.galleryName}`;
    const imageProperties = createImageProperties(props.imageId, imagePath);

    return (
        <ListItem>
            <GalleryLink href={imageProperties.imageMaxSize} data-fancybox="portfolio">
                <ResponsiveImage onLoad={props.onLoad} style={imageStyle} imagePath={imagePath} imageId={props.imageId} sizes={sizes} alt={alt} imageProperties={imageProperties}/>
            </GalleryLink>
        </ListItem>
    )
}

export default GalleryListItem;