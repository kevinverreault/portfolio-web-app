import AnalyticsService from './Services/AnalyticsService'

const ResponsiveImage = (props: any) => {
  const imageSet = `${props.imageProperties.image1x}, ${props.imageProperties.image2x}, ${props.imageProperties.image3x}, ${props.imageProperties.image4x}, ${props.imageProperties.image5x}, ${props.imageProperties.image6x}`

  function handleImageOnLoad () {
    props.onLoad()
  }

  function handleOnClick () {
    AnalyticsService.sendEvent(props.imageProperties.imageName)
  }

  return (
        <img style={props.style}
            sizes={props.sizes}
            srcSet={imageSet}
            src={props.imageProperties.imageMinSize}
            alt={props.alt}
            onLoad={handleImageOnLoad.bind(this)}
            onError={handleImageOnLoad.bind(this)}
            onClick={handleOnClick.bind(this)}
            />

  )
}

export default ResponsiveImage
