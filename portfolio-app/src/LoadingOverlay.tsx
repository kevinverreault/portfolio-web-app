import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled'
import { CircleLoader } from 'react-spinners';

// const fadeOut = keyframes`
// from {
//   transform: scale(1);
//   opacity: 1;
// }

// to {
//   transform: scale(.25);
//   opacity: 0;
// }
// `;

const fadeOut = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

type OverlayProps = {
    isLoading: boolean
};

const Overlay = styled.div<OverlayProps>`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    z-index: 1;
    visibility: ${props => props.isLoading ? 'visible' : 'hidden'};    
    animation: ${props => props.isLoading ? null : fadeOut} 1s linear;
    transition: visibility 1s linear;
    `

const LoadingOverlay = (props: any) => {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: grey;
        margin-top: 5em;
        `;

    return (
        <Overlay isLoading={props.loading}>
            <CircleLoader color="#212121" loading={props.loading} css={override} size={150} />
        </Overlay>
    )
}

export default LoadingOverlay;