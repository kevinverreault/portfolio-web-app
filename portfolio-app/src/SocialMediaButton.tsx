import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlickr, faInstagram, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import styled from '@emotion/styled';

interface SocialMediaButtonProps {
    target: string;
    label: string;
}

const IconListItem = styled.li`
    display: inline-block!important;
    margin: 0 0.5em 0 0.5em;
`;

const SocialMediaLink = styled.a`
    background-color: rgb(209, 213, 219);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, y
                rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, 
                rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    box-sizing: border-box;
    color: rgb(17, 24, 39);
    transition: all .2s ease;
    border-radius: 100%;
    display: inline-block;
    padding: 0.8em;
    border-bottom: 0;
    position: relative;
    :hover {
        background-color:rgb(156, 163, 175);
    }
    :active {
        transform: scale(0.95);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                    rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                    rgba(0, 0, 0, 0.1) 0px 2px 3px -0.5px, 
                    rgba(0, 0, 0, 0.06) 0px 1px 2px -0.5px;
    }
`;

const SocialMediaButton = (props: SocialMediaButtonProps) => {
    let icon: {}, label: {};
    if (props.label === "instagram") {
        icon = <FontAwesomeIcon icon={faInstagram} size="lg" />;
        label = <span style={{ display: "none" }}>Instagram</span>;
    } else if (props.label === "youtube") {
        icon = <FontAwesomeIcon icon={faYoutubeSquare} size="lg" />;
        label = <span style={{ display: "none" }}>Youtube</span>;
    } else {
        icon = <FontAwesomeIcon icon={faFlickr} size="lg" />;
        label = <span style={{ display: "none" }}>Flickr</span>;
    }

    return (
        <IconListItem>
            <SocialMediaLink href={props.target} target="_blank" rel="noreferrer">
                {icon}
                {label}
            </SocialMediaLink>
        </IconListItem>
    )

}

export default SocialMediaButton;