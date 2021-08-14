import { Link } from 'react-router-dom';
import TextButton from './TextButton';
import SocialMediaList from './SocialMediaList';
import styled from '@emotion/styled'

const Header = styled.header`
    padding-top: 2em;
    box-shadow: none;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-around;
`;

const Title = styled.h1`
    font-weight: 250;
    color: #212121;
    margin: auto;
    font-size: 1.5rem;
    line-height: 2rem;
`;

const Description = styled.p`
    line-height: 24px;
    margin: 0;
`;

const NavigationList = styled.ul`
    list-style: none;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 0;
    margin-top: 0;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

const NavListItem = styled.li`
    line-height: 24px;
    text-decoration: inherit;
    margin: 1em 0.5em 0 0.5em
`;

const NavigationHeader = () => {
    return (
        <Header>
            <Title>kevin verreault</Title>
            <Description>photographie de la nature du québec</Description>
            <SocialMediaList />
            <NavigationList>
                <NavListItem>
                    <Link to="/">
                        <TextButton label="accueil" />
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="/faune">
                        <TextButton label="faune" />
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="/paysages">
                        <TextButton label="paysages" />
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="/contact">
                        <TextButton label="contact" />
                    </Link>
                </NavListItem>
            </NavigationList>
        </Header>
    )
}

export default NavigationHeader;