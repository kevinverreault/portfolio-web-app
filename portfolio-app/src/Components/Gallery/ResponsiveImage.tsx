import AnalyticsService from '../../Services/AnalyticsService'
import { ImageProperties } from '../../responsiveImageHelper'

interface ResponsiveImageProps {
  imageProperties: ImageProperties
  customStyle?: boolean
  imageId: string
  alt: string
  sizes: string
  onLoad: () => void
}

const imageStyle = {
  width: '100%',
  borderRadius: '2px',
  imageRendering: '-webkit-optimize-contrast',
  boxSizing: 'border-box'
}

const ResponsiveImage = (props: ResponsiveImageProps) => {
  const sourceSet = props.imageProperties.sourceSet.slice(0, -1).join(', ')

  function handleImageOnLoad () {
    props.onLoad()
  }

  function handleOnClick () {
    AnalyticsService.sendEvent(props.imageProperties.imageName)
  }

  return (
        <img
          style={props.customStyle ? imageStyle as React.CSSProperties : {}}
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
