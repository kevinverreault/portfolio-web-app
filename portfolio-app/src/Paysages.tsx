import React from 'react';
import PhotoGallery from './PhotoGallery';

export default class Faune extends React.Component {
    render() {
        return (
            <PhotoGallery gallerySize={24} galleryName="paysage" />
        )
    }
}