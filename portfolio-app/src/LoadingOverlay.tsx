import { css } from '@emotion/react';
import styled from '@emotion/styled'
import { CircleLoader } from 'react-spinners';

type OverlayProps = {
    isLoading: boolean,
    margin?: string | null,
    hideIndicator?: boolean | null
}

const Overlay = styled.div<OverlayProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    min-height:100vh;
    z-index: 1;
    box-sizing: border-box;
    background-color: ${props => !props.hideIndicator ? "#f5f5f5" : "rgb(245, 245, 245, 0.5)" };
    opacity: ${props => props.isLoading ? '1': '0'};
    visibility: ${props => props.isLoading ? 'visible' : 'hidden'};    
    transition: visibility 1s linear, opacity 1s linear;
    top: ${props => props.margin ? props.margin : null};
    `

const LoadingOverlay = (props: OverlayProps) => {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: grey;
        margin-top: 5em;
        `

    return (
        <Overlay isLoading={props.isLoading} margin={props.margin} hideIndicator={props.hideIndicator}>
            { props.hideIndicator ? null : <CircleLoader color="#212121" loading={props.isLoading} css={override} size={150} /> }
        </Overlay>
    )
}

export default LoadingOverlay;