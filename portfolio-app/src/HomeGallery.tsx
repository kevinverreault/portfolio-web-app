import React from "react";

import HomeImage from './HomeImage';
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";
import styled from "styled-components";

const Grid = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    position: relative;
    opacity: 1;
    filter: none;
    margin-bottom: 3em;
    transition: opacity 1s ease, filter 1s ease;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    @media (max-width:1280px) {
        width:75%;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem 0 1rem;
    width: calc(100% / 3);
    @media (max-width:1280px) {
        margin: 0 0.75rem 0 0.75rem;
    }
    @media (max-width:768px) {
        margin: 0 0.5rem 0 0.5rem;
    }
`;

export default class HomeGallery extends React.Component {
    componentDidMount() {
        Fancybox.bind("[data-fancybox]", { zoom: true, protect: true });
    }
    render() { 
        return (
            <Grid className="homegallery">
                <Column className="homegallery-column">
                    <HomeImage imageId="1" />
                    <HomeImage imageId="2" />
                    <HomeImage imageId="3" />
                </Column>
                <Column className="homegallery-column">
                    <HomeImage imageId="4" />
                    <HomeImage imageId="5" />
                    <HomeImage imageId="6" />
                </Column>
                <Column className="homegallery-column">
                    <HomeImage imageId="7" />
                    <HomeImage imageId="8" />
                    <HomeImage imageId="9" />
                </Column>
            </Grid>
        
        )
    }
}