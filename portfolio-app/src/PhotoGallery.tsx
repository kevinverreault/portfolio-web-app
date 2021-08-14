import GalleryListItem from './GalleryListItem';
import styled from '@emotion/styled'
import LoadingOverlay from './LoadingOverlay';
import useWaitAllImages from './Hooks/useWaitAllImages';
import useImageGallery from './Hooks/useImageGallery';
import {  ImageHeader, TextHeader, TextSubHeader } from './Components/Forms/Shared/ImageHeader';
import useWaitImageLoad from './Hooks/useWaitImageLoad';

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
    margin-top: 2rem;
    @media (max-width:1600px) {
        width: 1020px;
    }
    @media (max-width:1366px) {
        width: 680px;
    }
    @media (max-width:768px) {
        width: 480px;
        width: 100%;
    }
    @media (max-width:480px) {
        width: 100%;
    }
    `


type PhotoGalleryProps = {
    GalleryName: string,
    GallerySize: number
}

const PhotoGallery = (props: PhotoGalleryProps) => {
    const lazyLoading = 20;
    
    const { isLoading, onLoadNotification } = useWaitAllImages(lazyLoading);

    const imageIds = [...Array(props.GallerySize+1).keys()].slice(1);
    const images = imageIds.map(x => {
        return <GalleryListItem key={x.toString()} imageId={x} galleryName={props.GalleryName} onLoad={onLoadNotification} onError={onLoadNotification} />;
    });

    const headerUrl = `images/${props.GalleryName}-header.jpg`;
    const headerImageIsLoading = useWaitImageLoad(headerUrl);

    useImageGallery();

    return (
        <div style={{minHeight:"100vh"}}>
            <LoadingOverlay isLoading={isLoading || headerImageIsLoading} />
            <ImageHeader imageIsLoading={headerImageIsLoading} headerUrl={headerUrl} opacity="0.85">
                    <TextHeader>{props.GalleryName}</TextHeader>
                    <TextSubHeader></TextSubHeader>
            </ImageHeader>
            <Container>     
                <ul style={{ padding: 0 }}>{images}</ul>
            </Container>
            
        </div>
    )
}

export default PhotoGallery;