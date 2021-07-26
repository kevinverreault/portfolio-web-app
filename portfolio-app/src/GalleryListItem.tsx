import React from 'react';
import GalleryImage from './GalleryImage';
import styled from "styled-components";

const ListItem = styled.li`
        display: inline-block;
        @media (max-width: 480px) {
            display: list-item;
        }
`;

export default class GalleryListItem extends React.Component <any>{
    alt: string;
    size: string;
    imagePath: string;

    constructor(props: any) {
        super(props);

        this.size = "(max-width:480px) 100vw, (max-width:768px) 224px, 320px";
        this.alt = `${props.galleryName} image ${props.imageId}`;
        this.imagePath= `images/${props.galleryName}`;
    }

    render() {
        return (
            <ListItem><GalleryImage imageId={this.props.imageId} size={this.size} alt={this.alt} imagePath={this.imagePath} /></ListItem>
        )
    }
}