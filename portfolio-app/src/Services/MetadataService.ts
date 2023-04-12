class MetadataService {
  public getMetadataKey(galleryName: string, imageId: string) {
    return `${galleryName}-${imageId}`
  }
}

export default new MetadataService()
