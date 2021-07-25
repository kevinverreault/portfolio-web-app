import React from 'react';
import './Home.css';
import HomeGallery from './HomeGallery';

export default class Home extends React.Component {
    render() {
        return (
            <div className="grid-homepage">
                <HomeGallery />
            </div>
        )
    }
}