import { createContext } from 'react'
import SiteMetadata from './SiteMetadata'

const MetadataContext = createContext<SiteMetadata>({
  imagesMetadata: new Map<string, string>(),
  pagesMetadata: new Map<string, number>()
})

function getMetadataKey(galleryName: string, imageId: string) {
  return `${galleryName.toLowerCase()}_${imageId}`
}

export { MetadataContext, getMetadataKey }
