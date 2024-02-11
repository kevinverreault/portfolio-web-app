import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface OverlayProps {
  isLoading: boolean
  margin?: string | null
  hideIndicator?: boolean | null
}

const Overlay = styled.div<OverlayProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  min-height:100vh;
  z-index: 1;
  box-sizing: border-box;
  background-color: ${props => !props.hideIndicator ? '#f5f5f5' : 'rgb(245, 245, 245, 0.5)'};
  opacity: ${props => props.isLoading ? '1' : '0'};
  visibility: ${props => props.isLoading ? 'visible' : 'hidden'};    
  transition: visibility 1s linear, opacity 1s linear;
  top: ${props => props.margin ? props.margin : null};
  `

const Load = styled.div`
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`

const Wrapper = styled.div`
  position: relative;
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
        <Wrapper>{ props.hideIndicator ? null : <Load /> }</Wrapper>
    </Overlay>
  )
}

export default LoadingOverlay
