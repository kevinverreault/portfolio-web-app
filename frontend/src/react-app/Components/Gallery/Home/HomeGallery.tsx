import HomeGridItem from './HomeGridItem'
import styled from '@emotion/styled'
import LoadingOverlay from '../../Shared/LoadingOverlay'
import useWaitAllImages from '../../../Hooks/useWaitAllImages'
import useImageGallery from '../../../Hooks/useImageGallery'
import { ImageHeader, TextHeader, TextSubHeader } from '../../Shared/ImageHeader'
import useWaitImageLoad from '../../../Hooks/useWaitImageLoad'

const breakpoints = [480, 768, 1280]

const mediaQueries = breakpoints.map(
  breakpoint => `@media (max-width: ${breakpoint}px)`
)

const Grid = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    position: relative;
    filter: none;
    margin-bottom: 3em;
    margin-top: 2rem;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    ${mediaQueries[2]} {
        width:75%;
    }
    ${mediaQueries[1]} {
        width: 100%;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem 0 1rem;
    width: calc(100% / 3);
    ${mediaQueries[2]} {
        margin: 0 0.75rem;
    }
    ${mediaQueries[1]} {
        margin: 0 0.5rem;
    }
    ${mediaQueries[0]} {
        margin: 0 0.25rem;
    }
`

const sizes = '(max-width:768px) 30vw, (max-width:1280px) 25vw, 15vw'

const HomeGallery = () => {
  const imageCount = 9
  const { isLoading, onLoadNotification } = useWaitAllImages(imageCount)

  const headerUrl = 'accueil-header.webp'
  const headerImageIsLoading = useWaitImageLoad(headerUrl)

  useImageGallery()

  return (
    <div>
        <LoadingOverlay isLoading={isLoading} />
        <ImageHeader
          imageIsLoading={headerImageIsLoading}
          headerUrl={headerUrl}
        >
          <TextHeader>Accueil</TextHeader>
          <TextSubHeader></TextSubHeader>
        </ImageHeader>
        <Grid>
          <Column>
            <HomeGridItem imageNumber={1} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem imageNumber={2} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem imageNumber={3} onLoad={onLoadNotification} sizes={sizes} />
          </Column>
          <Column>
            <HomeGridItem imageNumber={4} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem imageNumber={5} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem imageNumber={6} onLoad={onLoadNotification} sizes={sizes} />
          </Column>
          <Column>
            <HomeGridItem imageNumber={7} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem imageNumber={8} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem imageNumber={9} onLoad={onLoadNotification} sizes={sizes} />
          </Column>
        </Grid>
    </div>
  )
}

export default HomeGallery
