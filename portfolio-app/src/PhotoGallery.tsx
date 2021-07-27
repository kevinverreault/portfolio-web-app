import { useEffect } from 'react';
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";
import GalleryListItem from './GalleryListItem';
import styled from '@emotion/styled'

const Container = styled.div`
    width: 1366px;
    padding: 0;
    display: block;
    box-sizing: border-box;
    font-size: 0px;
    letter-spacing: 0px;
    word-spacing: 0px;
    transition: opacity 1s ease, filter 1s ease;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    @media (max-width:1600px) {
      width: 1020px;
    }
    @media (max-width:1366px) {
        width: 680px;
    }
    @media (max-width:768px) {
        width: 460px;
        width: 100%;
    }
    @media (max-width:480px) {
        width: 100%;
    }
    `;


const PhotoGallery = (props: any) => {
    const lazyLoading = 20;
    let images = new Array<JSX.Element>(props.gallerySize);
    for (let i = 1; i <= props.gallerySize; ++i) {
        const imageTag = <GalleryListItem key={i} imageId={i} galleryName={props.galleryName} />;
        images.push(imageTag)
    }
    useEffect(() => {
        Fancybox.bind("[data-fancybox]", { zoom: true, protect: true });
    });

    return (
        <Container>

            <ul style={{ padding: 0}}>{images}</ul>
        </Container>
    )
}

export default PhotoGallery;