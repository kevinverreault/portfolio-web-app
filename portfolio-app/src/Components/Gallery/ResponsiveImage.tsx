import { useImageClickedTracking } from '../../Hooks/useAnalytics'
import { ImageProperties } from '../../responsiveImageHelper'

interface ResponsiveImageProps {
  imageProperties: ImageProperties
  customStyle?: React.CSSProperties
  imageId: string
  description: string
  alt: string
  sizes: string
  onLoad: () => void
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
          style={props.customStyle ? props.customStyle : {}}
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

export default ResponsiveImage
