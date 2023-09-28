import { useImageClickedTracking } from '../../Hooks/useAnalytics'

interface ImageProperties {
  imageMaxSize: string
  imageMinSize: string
  sourceSet: string[]
  imageName: string
}

interface ResponsiveImageProps {
  imageProperties: ImageProperties
  customStyle?: React.CSSProperties
  imageId: string
  description: string
  alt: string
  sizes: string
  onLoad: () => void
}

const defaultStyle: React.CSSProperties = {
  width: '100%',
  imageRendering: '-webkit-optimize-contrast'
}

const ResponsiveImage = (props: ResponsiveImageProps) => {
  const sourceSet = props.imageProperties.sourceSet.slice(0, -1).join(', ')
  const imageClickedTracking = useImageClickedTracking()

  function handleImageOnLoad () {
    props.onLoad()
  }

  function handleOnClick () {
    imageClickedTracking(props.imageProperties.imageName, props.description)
  }

  return (
    <img
      style={ props.customStyle ? { ...defaultStyle, ...props.customStyle } : defaultStyle }
      sizes={props.sizes}
      srcSet={sourceSet}
      src={props.imageProperties.imageMinSize}
      alt={props.alt}
      onLoad={handleImageOnLoad.bind(this)}
      onError={handleImageOnLoad.bind(this)}
      onClick={handleOnClick.bind(this)}
      />
  )
}

const getImageProperties = (sourceSet: string[], imageName: string): ImageProperties => {
  return {
    imageMinSize: sourceSet[0].substring(0, sourceSet[0].lastIndexOf(' ')),
    imageMaxSize: sourceSet[sourceSet.length - 1].substring(0, sourceSet[0].lastIndexOf(' ')),
    sourceSet,
    imageName
  }
}

const createImageProperties = (imageId: string, album: string): ImageProperties => {
  const imageName = `${album}-${imageId}.jpg`

  const sourceSet: string[] = [
    `images/1x/${imageName} 300w`,
    `images/2x/${imageName} 500w`,
    `images/3x/${imageName} 750w`,
    `images/4x/${imageName} 1000w`,
    `images/5x/${imageName} 1280w`,
    `images/6x/${imageName} 1440w`,
    `images/7x/${imageName} 1920w`
  ]

  return getImageProperties(sourceSet, imageName)
}

const createVerticalImageProperties = (imageId: string, album: string): ImageProperties => {
  const imageName = `${album}-${imageId}.jpg`

  const sourceSet: string[] = [
    `images/1x/${imageName} 225w`,
    `images/2x/${imageName} 375w`,
    `images/3x/${imageName} 562w`,
    `images/4x/${imageName} 750w`,
    `images/5x/${imageName} 960w`,
    `images/6x/${imageName} 1080w`,
    `images/7x/${imageName} 1440w`
  ]

  return getImageProperties(sourceSet, imageName)
}

export { ResponsiveImage, createImageProperties, createVerticalImageProperties }
export type { ImageProperties }
