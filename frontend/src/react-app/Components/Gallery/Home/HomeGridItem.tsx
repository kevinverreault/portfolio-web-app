import { ResponsiveImage } from '../ResponsiveImage'
import ResponsiveImageService from '../../../Services/ResponsiveImageService'
import type { ImageMetadata } from '../../../Contexts/SiteMetadata'
import '../Gallery.css'

interface HomeGridItemProps {
  sizes: string
  onLoad: () => void
  image: ImageMetadata
}

const HomeGridItem = (props: HomeGridItemProps) => {
  const { image } = props;
  const alt = `accueil image - ${image.metadata.description}`
  const imageProperties = ResponsiveImageService.createImageSourceSet(image.id)

  return (
    <a className='home-gallery-link'
      data-fancybox="portfolio"
      data-src={imageProperties.fullsizeSource}
      data-caption={image.metadata.description}
      data-srcset={imageProperties.fullsizeSourceSet}
      data-sizes='50vw'
    >
      <ResponsiveImage
        onLoad={props.onLoad}
        description={image.metadata.description}
        sizes={props.sizes}
        alt={alt}
        imageName={imageProperties.imageName}
        imageSource={imageProperties.fullsizeSource}
        sourceSet={imageProperties.fullsizeSourceSet}
        customStyle={{
          display: 'block'
        }}
      />
    </a>
  )
}

export default HomeGridItem
