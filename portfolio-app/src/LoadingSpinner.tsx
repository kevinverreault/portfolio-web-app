import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled'
import { CircleLoader } from 'react-spinners';

const fadeIn = keyframes`
from {
  transform: scale(.25);
  opacity: 0;
}

to {
  transform: scale(1);
  opacity: 1;
}
`;

const fadeOut = keyframes`
from {
  transform: scale(1);
  opacity: 1;
}

to {
  transform: scale(.25);
  opacity: 0;
}
`;

type OverlayProps = {
    loading: boolean
};

const Overlay = styled.div<OverlayProps>`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    visibility: ${props => props.loading ? 'visible' : 'hidden'};
    `
    // animation: ${fadeOut} 1s linear;
    // transition: visibility 1s linear;`

const LoadingSpinner = (props: any) => {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: grey;
        margin-top: 5em;
        `;
    return (
        <Overlay loading={props.loading}>
            <CircleLoader color="#212121" loading={props.loading} css={override} size={150}/>
        </Overlay>
    )
}

export default LoadingSpinner;