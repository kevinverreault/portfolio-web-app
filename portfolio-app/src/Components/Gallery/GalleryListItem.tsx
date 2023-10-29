import { forwardRef, useContext } from 'react'
import styled from '@emotion/styled'
import { MetadataContext, getMetadataKey } from '../../Contexts/MetadataContext'
import { ResponsiveImage } from './ResponsiveImage'
import ResponsiveImageService from '../../Services/ResponsiveImageService'

const ListItem = styled.li`
    width:500px;
    min-height:500px;
    display: inline-block;
    transition: all .2s ease;
    box-sizing: border-box;
    margin: 0 10px 20px 10px;

    @media (max-width: 1366px) {
        width:50%;
        min-height:50%;
        padding: 0 10px 0 10px;
        margin-right: auto;
        margin-left: auto;
    }
    @media (max-width: 768px) {
        width: 90%;
        min-height:90%;
        display: list-item;
        padding: 2px;
    }
`

const GalleryLink = styled.a`
    width: 100%;
    box-sizing: border-box;
    display: block;
    :hover {
        box-shadow: inset 0 0 0 1px rgba(61, 8, 8, 0.25), 0 0 6px 0 #37474f;
        opacity: 90%;
        cursor: pointer;
     }
`
type ListItemForwardedRef = React.ForwardedRef<HTMLLIElement>

interface GalleryListItemProps {
  galleryName: string
  imageId: string
  onLoad: () => void
}

const GalleryListItem = forwardRef((props: GalleryListItemProps, ref: ListItemForwardedRef) => {
  const metadataContext = useContext(MetadataContext)

  const sizes = '(max-width:768px) 90vw, (max-width:1366px) 50vw, 500px'
  const alt = `${props.galleryName} image ${props.imageId}`
  const description = metadataContext.imagesMetadata.get(getMetadataKey(props.galleryName, props.imageId)) ?? ''
  const imageProperties = ResponsiveImageService.createImageSourceSet(props.imageId, props.galleryName)

  return (
    <ListItem ref={ref}>
      <GalleryLink
        data-fancybox='portfolio'
        data-caption={description}
        data-src={imageProperties.fullsizeSource}
        data-srcset={imageProperties.fullsizeSourceSet}
        data-sizes='50vw'
      >
        <ResponsiveImage
          onLoad={props.onLoad}
          imageId={props.imageId}
          description={description}
          sizes={sizes}
          alt={alt}
          imageName={imageProperties.imageName}
          imageSource={imageProperties.thumbnailSource}
          sourceSet={imageProperties.thumbnailSourceSet}
          customStyle={{
            borderRadius: '2px',
            boxSizing: 'border-box'
          }}
        />
      </GalleryLink>
  </ListItem>
  )
})

GalleryListItem.displayName = 'GalleryListItem'

export { GalleryListItem }
export type { GalleryListItemProps }
