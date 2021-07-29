import React from 'react';
import SocialMediaButton from './SocialMediaButton';

export default class SocialMediaList extends React.Component {
    render() {
        return (
            <ul className="icons">
                <SocialMediaButton target="https://www.instagram.com/kevinverreault_/" label="instagram" />
                <SocialMediaButton target="https://www.youtube.com/channel/UC0H8kS7v1U5yprgK7RHqQZQ" label="youtube" />
                <SocialMediaButton target="https://www.flickr.com/photos/152334550@N04/" label="flickr" />
            </ul>
        )
    }
}