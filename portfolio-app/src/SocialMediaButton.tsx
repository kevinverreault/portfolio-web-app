import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlickr, faInstagram, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import './Header.css';

interface SocialMediaButtonProps {
    target: string;
    label: string;
}

export default class SocialMediaButton extends React.Component<SocialMediaButtonProps> {
    render() {
        let icon;
        if (this.props.label === "instagram") {
            icon = <FontAwesomeIcon icon={faInstagram} size="lg"/>;
        } else if (this.props.label === "youtube") {
            icon = <FontAwesomeIcon icon={faYoutubeSquare} size="lg"/>;
        } else {
            icon = <FontAwesomeIcon icon={faFlickr} size="lg"/>;
        }
        
        return ( 
            <li className="icon-listitem">
                <a href={this.props.target} target="_blank" rel="noreferrer" className="icon entete-bouton entete-bouton-socialmedia">
                    {icon}
                </a>
            </li>
        )
    }
}