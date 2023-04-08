import metadata from '../../src/metadaja.json'

class MetadataService {
  public getMetadata(): Map<string, string> {
    return new Map<string, string>(Object.entries(metadata))
  }

  public getMetadataKey(galleryName: string, imageId: string) {
    return `${galleryName}-${imageId}`
  }
}

export default new MetadataService()
