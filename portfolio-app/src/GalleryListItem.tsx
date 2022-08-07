import { forwardRef } from 'react';
import styled from '@emotion/styled'
import ResponsiveImage from './ResponsiveImage';
import { createImageProperties } from './responsiveImageHelper';

const ListItem = styled.li`
    width:500px;
    min-height:500px;
    display: inline-block;
    transition: all .2s ease;
    box-sizing: border-box;
    margin: 0 10px 20px 10px;

    @media (max-width: 1366px) {
        width:50%;
        min-height:50%;
        padding: 0 10px 0 10px;
        margin-right: auto;
        margin-left: auto;
    }
    @media (max-width: 768px) {
        width: 90%;
        min-height:90%;
        display: list-item;
        padding: 2px;
    }
`;

const GalleryLink = styled.a`
    width: 100%;
    box-sizing: border-box;
    display: block;
    :hover {
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 6px 0 #37474f;
        opacity: 90%;
     }
`;

const imageStyle = {
    width: '100%',
    borderRadius: "2px",
    imageRendering: "-webkit-optimize-contrast",
    boxSizing: "border-box"
}

const GalleryListItem = (props: any, ref: any) => {
    const sizes = "(max-width:768px) 90vw, (max-width:1366px) 50vw, 500px";
    //const sizes = "500px";
    const alt = `${props.galleryName} image ${props.imageId}`;
    const imagePath= `images/${props.galleryName}`;
    const imageProperties = createImageProperties(props.imageId, imagePath);

    return (
         <ListItem ref={ref}>
            <GalleryLink href={imageProperties.imageMaxSize} data-fancybox="portfolio">
                <ResponsiveImage onLoad={props.onLoad} style={imageStyle} imagePath={imagePath} imageId={props.imageId} sizes={sizes} alt={alt} imageProperties={imageProperties} lazyLoading={props.lazyLoading}/>;
            </GalleryLink>
        </ListItem>
    );
}

export default forwardRef(GalleryListItem);