import { forwardRef } from 'react'
import { ResponsiveImage, type ImageProperties } from './ResponsiveImage'
import './Gallery.css'

type ListItemForwardedRef = React.ForwardedRef<HTMLLIElement>

interface GalleryListItemProps {
  alt: string
  imageProperties: ImageProperties
  description: string
  onLoad: () => void
}

const GalleryListItem = forwardRef((props: GalleryListItemProps, ref: ListItemForwardedRef) => {

  const { imageProperties, alt, description } = props;
  const sizes = '(max-width:768px) 90vw, (max-width:1366px) 50vw, 500px';

  return (
    <li className='gallery-list-item' ref={ref}>
      <a
        className='gallery-link'
        data-fancybox='portfolio'
        data-caption={description}
        data-src={imageProperties.fullsizeSource}
        data-srcset={imageProperties.fullsizeSourceSet}
        data-sizes='50vw'
      >
        <ResponsiveImage
          onLoad={props.onLoad}
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
      </a>
  </li>
  )
})

GalleryListItem.displayName = 'GalleryListItem'

export { GalleryListItem }
export type { GalleryListItemProps }
