import styled from '@emotion/styled'
import { createImageProperties, createVerticalImageProperties } from './responsiveImageHelper'
import AnalyticsService from './Services/AnalyticsService'
import { MetadataContext } from './Context/MetadataContext'
import { useContext } from 'react'
import MetadataService from './Services/MetadataService'

const GalleryLink = styled.a`
    margin: 0 0 2em 0;
    transition: all .2s ease;
    display: block;
    width: 100%;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
    @media (max-width:1280px) {
        margin: 0 0 1.5rem 0;
    }
    @media (max-width:768px) {
        margin: 0 0 1rem 0;
    }

    @media (max-width: 480px) {
        margin: 0 0 0.5rem 0;
    }

    :hover {
        background-color: rgba(255, 255, 255, 0.25);
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 .5em 0 #37474f;
        opacity: 90%;
    }
`

const ResponsiveImage = styled.img`
    display: block;
    width: 100%;
    image-rendering: -webkit-optimize-contrast;
`

interface HomeGridItemProps {
  imageId: string
  onLoad: () => void
  vertical?: boolean
}

const HomeGridItem = (props: HomeGridItemProps) => {
  const metadataContext = useContext(MetadataContext)
  const size = '(max-width:768px) 33vw, (max-width:1280px) 25vw, 20vw'
  const alt = `accueil image ${props.imageId}`
  const album = 'Accueil'
  const imageProperties = props.vertical ? createVerticalImageProperties(props.imageId, album) : createImageProperties(props.imageId, album)

  const imageSet = imageProperties.imageSet.slice(0, -1).join(', ')

  function handleImageOnLoad () {
    props.onLoad()
  }

  function handleOnClick () {
    AnalyticsService.sendEvent(imageProperties.imageName)
  }

  const metadataKey = MetadataService.getMetadataKey(album, props.imageId)

  return (
        <GalleryLink href={imageProperties.imageMaxSize}
                    data-fancybox="portfolio" data-caption={metadataContext.has(metadataKey) ? metadataContext.get(metadataKey) : ''}>
            <ResponsiveImage srcSet={imageSet}
                            sizes={size}
                            src={imageProperties.imageMinSize}
                            alt={alt}
                            onLoad={handleImageOnLoad.bind(this)}
                            onClick={handleOnClick.bind(this)} />
        </GalleryLink>
  )
}

export default HomeGridItem
