import styled from "styled-components";
import createImageset from './responsiveImageHelper';

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
    display: inline-block;
    margin: 10px;
    :hover {
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 6px 0 #37474f;
        opacity: 90%;
     }
     @media (max-width: 768px) {
        margin: 2px;
        width: 220px;
    }
    @media (max-width: 480px) {
        width: 100%;
        margin: 0;
    }
`;

const ResponsiveImage = styled.img`
        width: 100%;
        border-radius: 2px;
        image-rendering: -webkit-optimize-contrast;
        box-sizing: border-box;
`;

const GalleryListItem = (props: any) => {
    let sizes = "(max-width:480px) 100vw, (max-width:768px) 224px, 320px";
    let alt = `${props.galleryName} image ${props.imageId}`;
    let imagePath= `images/${props.galleryName}`;

    const imageset = createImageset(props.imageId, imagePath);

    let imageSet = `${imageset.image1x}, ${imageset.image2x}, ${imageset.image3x}, ${imageset.image4x}, ${imageset.image5x}`;
    let imageMaxSize = imageset.imageMaxSize;
    let imageMinSize = imageset.imageMinSize;

    return (
            <ListItem>
                <GalleryLink href={imageMaxSize} data-fancybox="portfolio">
                    <ResponsiveImage srcSet={imageSet} sizes={sizes} src={imageMinSize} alt={alt} />
                </GalleryLink>
            </ListItem>
        )
}

export default GalleryListItem;