import SocialMediaButton from './SocialMediaButton';
import styled from '@emotion/styled';

const IconList = styled.ul`
    cursor: default;
    list-style: none;
    margin-top: 0.75rem;
    margin-block-end: 0px;
    padding: 0;
    display: flex;
    justify-content:space-between;
`;

const SocialMediaList = () => {
        return (
            <IconList>
                <SocialMediaButton target="https://www.instagram.com/kevinverreault_/" label="instagram" />
                <SocialMediaButton target="https://www.youtube.com/channel/UC0H8kS7v1U5yprgK7RHqQZQ" label="youtube" />
                <SocialMediaButton target="https://www.flickr.com/photos/152334550@N04/" label="flickr" />
            </IconList>
        )
}

export default SocialMediaList;