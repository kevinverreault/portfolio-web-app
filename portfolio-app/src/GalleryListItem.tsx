import styled from '@emotion/styled'
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
    display: block;
    margin: 10px;
    :hover {
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 6px 0 #37474f;
        opacity: 90%;
     }
     @media (max-width: 768px) {
        margin: 10px;
        width: 200px;
    }
    @media (max-width: 480px) {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
    }
`;

const ResponsiveImage = styled.img`
    width: 100%;
    border-radius: 2px;
    image-rendering: -webkit-optimize-contrast;
    box-sizing: border-box;
`;

const GalleryListItem = (props: any) => {
    let sizes = "(max-width:480px) 80vw, (max-width:768px) 200px, 320px";
    let alt = `${props.galleryName} image ${props.imageId}`;
    let imagePath= `images/${props.galleryName}`;
    const imageProperties = createImageset(props.imageId, imagePath);

    const imageSet = `${imageProperties.image1x}, ${imageProperties.image2x}, ${imageProperties.image3x}, ${imageProperties.image4x}`;
    
    function handleImageOnLoad() {
        props.onLoad();
    }

    return (
            <ListItem>
                <GalleryLink href={imageProperties.imageMaxSize} data-fancybox="portfolio">
                    <ResponsiveImage srcSet={imageSet} sizes={sizes} src={imageProperties.imageMinSize} alt={alt} onLoad={handleImageOnLoad.bind(this)} />
                </GalleryLink>
            </ListItem>
        )
}

export default GalleryListItem;