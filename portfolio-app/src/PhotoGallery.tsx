import React from 'react';
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";
import GalleryListItem from './GalleryListItem';
import styled from "styled-components";

const Liste = styled.div`
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
        padding: 0 5px 0 5px;
    }
    @media (max-width:480px) {
        width: 100%;
        padding: 0 5px 0 5px;
    }
    `;

export default class PhotoGallery extends React.Component<any> {
    images: Array<JSX.Element>;

    constructor(props: any) {
        super(props);
        this.images = new Array<JSX.Element>(props.gallerySize);
        for (let i = 1; i <= props.gallerySize; ++i) {
            const imageTag = <GalleryListItem key={i} imageId={i} galleryName={props.galleryName} />;
            this.images.push(imageTag)
        }

    }
    
    componentDidMount() {
        Fancybox.bind("[data-fancybox]", { zoom: true, protect: true });
    }

    render() {
        return (
            <Liste className="gallery-container">
                <ul style={{ padding: 0}}>{this.images}</ul>
            </Liste>
        )
    }
}