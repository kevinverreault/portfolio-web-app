import { useState } from 'react'
import { useImageClickedTracking } from '../../Hooks/useAnalytics'
import './Gallery.css'

interface ImageProperties {
  fullsizeSource: string
  thumbnailSource: string
  fullsizeSourceSet: string[]
  thumbnailSourceSet: string[]
  imageName: string
}

interface ResponsiveImageProps {
  imageName: string
  imageSource: string
  sourceSet: string[]
  customStyle?: React.CSSProperties
  description: string
  alt: string
  sizes: string
  onLoad: () => void
}

const defaultStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  imageRendering: '-webkit-optimize-contrast'
}

const ResponsiveImage = (props: ResponsiveImageProps) => {
  const sourceSet = props.sourceSet.slice(1).join(', ')
  const imageClickedTracking = useImageClickedTracking()
  const [loaded, setLoaded] = useState(false);

  function handleImageOnLoad () {
    props.onLoad()
    setLoaded(true)
  }

  function handleOnClick () {
    imageClickedTracking(props.imageName, props.description)
  }

  return (
    <img
      style={ props.customStyle ? { ...defaultStyle, ...props.customStyle } : defaultStyle }
      className={`image ${loaded ? 'loaded': ''}`}
      sizes={props.sizes}
      srcSet={sourceSet}
      src={props.imageSource}
      alt={props.alt}
      onLoad={handleImageOnLoad.bind(this)}
      onError={handleImageOnLoad.bind(this)}
      onClick={handleOnClick.bind(this)}
    />
  )
}

export { ResponsiveImage }
export type { ImageProperties }
