import { createContext } from 'react'

const MetadataContext = createContext(new Map<string, string>())

function getMetadataKey(galleryName: string, imageId: string) {
  return `${galleryName}-${imageId}`
}

export { MetadataContext, getMetadataKey }
