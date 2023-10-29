import { ImageProperties } from '../Components/Gallery/ResponsiveImage'

class ResponsiveImageService {
  private readonly extension = '.jpg'
  private readonly imageHost = process.env.REACT_APP_IMAGES_CDN_HOST ?? ''
  private readonly sizes = ['2000w', '1750w', '1500w', '1250w', '1000w', '750w', '500w', '250w']
  private readonly thumbnailFormat = 'thumbnail'
  private readonly fullsizeFormat = 'fullsize'

  createImageSourceSet(imageId: string, album: string): ImageProperties {
    const imageName = `${album}_${imageId}`
    const imageSourceSet = (size: string, format: string) => `${this.imageHost}/${format}/${size}/${imageName}${this.extension} ${size}`
    const fullsizeSourceSet: string[] = []
    const thumbnailSourceSet: string[] = []
    for (const size of this.sizes) {
      fullsizeSourceSet.push(imageSourceSet(size, this.fullsizeFormat))
      thumbnailSourceSet.push(imageSourceSet(size, this.thumbnailFormat))
    }

    return this.getImageProperties(fullsizeSourceSet, thumbnailSourceSet, imageName)
  }

  private getImageProperties(fullsizeSourceSet: string[], thumbnailSourceSet: string[], imageName: string): ImageProperties {
    return {
      fullsizeSource: this.getSourceFromSet(fullsizeSourceSet),
      thumbnailSource: this.getSourceFromSet(thumbnailSourceSet),
      fullsizeSourceSet,
      thumbnailSourceSet,
      imageName
    }
  }

  private getSourceFromSet(sourceSet: string[]): string {
    return sourceSet[sourceSet.length - 1].substring(0, sourceSet[0].lastIndexOf(' '))
  }
}

export default new ResponsiveImageService()
