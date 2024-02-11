import SocialMediaButton from './SocialMediaButton'
import styled from '@emotion/styled'

const IconList = styled.ul`
    cursor: default;
    list-style: none;
    margin-top: 0.75rem;
    margin-block-end: 0px;
    padding: 0;
    display: flex;
    justify-content:space-between;
`

const SocialMediaList = () => {
  return (
    <IconList>
      <SocialMediaButton target="https://www.instagram.com/kevinverreault_/" label="instagram" />
      <SocialMediaButton target="https://www.youtube.com/@kevinverreaultphotographie" label="youtube" />
      <SocialMediaButton target="https://www.threads.net/@kevinverreault_" label="threads" />
    </IconList>
  )
}

export default SocialMediaList
