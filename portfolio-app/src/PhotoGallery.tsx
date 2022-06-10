import { useEffect, useState, useRef } from 'react';
import GalleryListItem from './GalleryListItem';
import styled from '@emotion/styled'
import LoadingOverlay from './LoadingOverlay';
import useWaitAllImages from './Hooks/useWaitAllImages';
import useImageGallery from './Hooks/useImageGallery';
import {  ImageHeader, TextHeader, TextSubHeader } from './Components/Forms/Shared/ImageHeader';
import useWaitImageLoad from './Hooks/useWaitImageLoad';

const Container = styled.div`
    width: 1920px;
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

    @media (max-width:1920px) {
        width: 1366px;
    }
    @media (max-width:1366px) {
        width: 100%;
    }
    `


type PhotoGalleryProps = {
    GalleryName: string,
    GallerySize: number
}

const PhotoGallery = (props: PhotoGalleryProps) => {
    const pageSize = 12;
    const totalPages = Math.ceil(props.GallerySize / pageSize);
    
    const [pageNumber, setPageNumber] = useState(1);
//    const [listItems, setListItems] = useState<number[]>([...Array(pageSize+1).keys()].slice(1)); 
    const [listItems, setListItems] = useState<number[]>([]); 
    const { isLoading, onLoadNotification } = useWaitAllImages(pageSize);

    const lastElement = useRef(null);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        const options = {
            root: document,
            rootMargin: "20px",
            threshold: 1
        };

        const callback = (entries : any) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setPageNumber((no) => no + 1);
            }
        };

        observer.current = new IntersectionObserver(callback, options);

        if (lastElement.current) {
            observer.current.observe(lastElement.current);
          }
        return () => {
            observer?.current?.disconnect();
        };
    });

    useEffect(() => {
        const addPage = () => {
            const imagesToLoad : number[] = [];
            for (var i = ((pageNumber - 1) * pageSize) + 1; (i <= pageNumber * pageSize) && (i <= props.GallerySize); ++i) {
                imagesToLoad.push(i);
            }
    
            setListItems(l => [...l, ...imagesToLoad]);
        };

        if (pageNumber <= totalPages) {
            addPage();
        }
    }, [pageNumber, totalPages, props.GallerySize]);

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
                <ul style={{ padding: 0 }}>
                    {
                        listItems.map((x) => {
                            return x === listItems.length ?
                                <GalleryListItem ref={lastElement} key={`${props.GalleryName}-${x.toString()}`} imageId={x} galleryName={props.GalleryName} onLoad={onLoadNotification}/> :
                                <GalleryListItem key={`${props.GalleryName}-${x.toString()}`} imageId={x} galleryName={props.GalleryName} onLoad={onLoadNotification}/>;
                        })
                    }
                </ul>
                <div />
            </Container>
        </div>
    )
}

export default PhotoGallery;