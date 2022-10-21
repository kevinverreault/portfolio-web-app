const createImageProperties = (imageId: string, album: string) => {
  const imageName = `${album}-${imageId}.jpg`
  const imageMaxSize = `images/7x/${imageName}`
  const imageMinSize = `images/1x/${imageName}`

  const image1x = `${imageMinSize} 300w`
  const image2x = `images/2x/${imageName} 500w`
  const image3x = `images/3x/${imageName} 750w`
  const image4x = `images/4x/${imageName} 1000w`
  const image5x = `images/5x/${imageName} 1300w`
  const image6x = `images/6x/${imageName} 1600w`
  const image7x = `${imageMaxSize} 1920w`

  return {
    imageMaxSize,
    imageMinSize,
    image1x,
    image2x,
    image3x,
    image4x,
    image5x,
    image6x,
    image7x,
    imageName
  }
}

const createVerticalImageProperties = (imageId: string, album: string) => {
  const imageName = `${album}-${imageId}.jpg`
  const imageMaxSize = `images/7x/${imageName}`
  const imageMinSize = `images/1x/${imageName}`

  const image1x = `${imageMinSize} 240w`
  const image2x = `images/2x/${imageName} 320w`
  const image3x = `images/3x/${imageName} 400w`
  const image4x = `images/4x/${imageName} 512w`
  const image5x = `images/5x/${imageName} 650w`
  const image6x = `images/6x/${imageName} 800w`
  const image7x = `${imageMaxSize} 960w`

  return {
    imageMaxSize,
    imageMinSize,
    image1x,
    image2x,
    image3x,
    image4x,
    image5x,
    image6x,
    image7x,
    imageName
  }
}

export { createImageProperties, createVerticalImageProperties }
