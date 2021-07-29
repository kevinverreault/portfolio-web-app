import createImageset from './responsiveImageHelper';
import styled from '@emotion/styled'

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

const GalleryImage = (props: any) => {
    const imageset = createImageset(props.imageId, props.imagePath);

    let imageSet = `${imageset.image1x}, ${imageset.image2x}, ${imageset.image3x}, ${imageset.image4x}, ${imageset.image5x}`;
    let imageMaxSize = imageset.imageMaxSize;
    let imageMinSize = imageset.imageMinSize;

    return (
        <GalleryLink href={imageMaxSize} data-fancybox="portfolio">
            <ResponsiveImage srcSet={imageSet} sizes={props.size} src={imageMinSize} alt={props.alt} />
        </GalleryLink>
    )
}

export default GalleryImage;