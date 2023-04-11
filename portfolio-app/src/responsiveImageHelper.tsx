interface ImageProperties {
  imageMaxSize: string
  imageMinSize: string
  sourceSet: string[]
  imageName: string
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
    `images/5x/${imageName} 1300w`,
    `images/6x/${imageName} 1600w`,
    `images/7x/${imageName} 1920w`
  ]

  return getImageProperties(sourceSet, imageName)
}

const createVerticalImageProperties = (imageId: string, album: string): ImageProperties => {
  const imageName = `${album}-${imageId}.jpg`

  const sourceSet: string[] = [
    `images/1x/${imageName} 240w`,
    `images/2x/${imageName} 320w`,
    `images/3x/${imageName} 400w`,
    `images/4x/${imageName} 512w`,
    `images/5x/${imageName} 650w`,
    `images/6x/${imageName} 800w`,
    `images/7x/${imageName} 960w`
  ]

  return getImageProperties(sourceSet, imageName)
}

export { createImageProperties, createVerticalImageProperties }
export type { ImageProperties }
