import React from "react";

import HomeImage from './HomeImage';
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";

export default class HomeGallery extends React.Component {
    componentDidMount() {
        Fancybox.bind("[data-fancybox]", { zoom: true, protect: true });
    }
    render() { 
        return (
            <div className="thumbnails">
                <div className="thumbnails-column">
                    <HomeImage imageId="1" />
                    <HomeImage imageId="2" />
                    <HomeImage imageId="3" />
                </div>
                <div className="thumbnails-column">
                    <HomeImage imageId="4" />
                    <HomeImage imageId="5" />
                    <HomeImage imageId="6" />
                </div>
                <div className="thumbnails-column">
                    <HomeImage imageId="7" />
                    <HomeImage imageId="8" />
                    <HomeImage imageId="9" />
                </div>
            </div>
        
        )
    }
}