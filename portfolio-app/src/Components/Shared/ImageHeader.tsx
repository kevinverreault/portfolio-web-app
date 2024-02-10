import styled from '@emotion/styled'
import { css } from '@emotion/react'

const headerHeight = '400px'

const ImageHeader = styled.div<{ imageIsLoading?: boolean | null, headerUrl: string, opacity?: string }>`
  height: ${headerHeight};
  margin: 0 auto;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${props => !props.imageIsLoading ? `url('${props.headerUrl}')` : null};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.opacity ? props.opacity : '1.0'};
`

const headerStyle = css`
  color:rgb(245, 245, 245);
`
const TextHeader = styled.h1`
  ${headerStyle}
  font-size: 46px;
  text-shadow: 0.5px 0.5px 4px grey;
`

const TextSubHeader = styled.h2` 
  ${headerStyle}
  margin-left: 0.67em;
  margin-right: 0.67em;
`

const HeaderWrapper = styled.div`
  border-radius: 5px;
  background-color: rgb(33, 33, 33, 0.4);
  text-align: center;
  padding-right: 0.67em;
  padding-left: 0.67em;
`
export { ImageHeader, TextHeader, TextSubHeader, HeaderWrapper }
