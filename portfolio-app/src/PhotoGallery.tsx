import React from 'react';
import './PhotoGallery.css';
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";
import GalleryImage from './GalleryImage';

export default class PhotoGallery extends React.Component<any> {
    images: Array<JSX.Element>;

    constructor(props: any) {
        super(props);
        this.images = new Array<JSX.Element>(props.gallerySize);
        for (let i = 1; i <= props.gallerySize; ++i) {
            const imageTag = <GalleryImage key={i} imageId={i} galleryName={props.galleryName} />;
            this.images.push(imageTag)
        }
    }
    
    componentDidMount() {
        Fancybox.bind("[data-fancybox]", { zoom: true, protect: true });
    }

    render() {
        return (
            <ul className="gallery-container">{this.images}</ul>
        )
    }
}