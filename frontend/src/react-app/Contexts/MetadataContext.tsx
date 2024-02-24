import { createContext } from 'react'
import type { Album, SiteMetadata } from './SiteMetadata'

const MetadataContext = createContext<SiteMetadata>({
  albums: []
})

function getAlbum(albumName: string, albums: Album[]): Album {
  const albumIndex = albums.findIndex(x => x.title === albumName)
  if (albumIndex < 0) {
    throw Error(`Album ${albumName} not found in metadata`)
  }

  return albums[albumIndex]
}

export { MetadataContext, getAlbum }
