import styled from '@emotion/styled'
import { MetadataContext, getMetadataKey } from '../../../Contexts/MetadataContext'
import { useContext } from 'react'
import { ResponsiveImage } from '../ResponsiveImage'
import ResponsiveImageService from '../../../Services/ResponsiveImageService'

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
        cursor: pointer;
    }
`

interface HomeGridItemProps {
  imageId: string
  sizes: string
  onLoad: () => void
}

const HomeGridItem = (props: HomeGridItemProps) => {
  const metadataContext = useContext(MetadataContext)
  const albumKey = 'accueil'
  const description = metadataContext.imagesMetadata.get(getMetadataKey(albumKey, props.imageId)) ?? ''
  const alt = `accueil image ${props.imageId} ${description}`
  const imageProperties = ResponsiveImageService.createImageSourceSet(props.imageId, albumKey)

  return (
    <GalleryLink
      data-fancybox="portfolio"
      data-src={imageProperties.fullsizeSource}
      data-caption={description}
      data-srcset={imageProperties.fullsizeSourceSet}
      data-sizes='50vw'
    >
      <ResponsiveImage
        onLoad={props.onLoad}
        imageId={props.imageId}
        description={description}
        sizes={props.sizes}
        alt={alt}
        imageName={imageProperties.imageName}
        imageSource={imageProperties.fullsizeSource}
        sourceSet={imageProperties.fullsizeSourceSet}
        customStyle={{
          display: 'block'
        }}
      />
    </GalleryLink>
  )
}

export default HomeGridItem
