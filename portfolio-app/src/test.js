import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled'

const Container = styled.div(props => ({
    display: 'flex',
    flexDirection: props.column && 'column'
  }))
  