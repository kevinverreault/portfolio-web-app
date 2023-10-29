import { useEffect, useState } from 'react'
import images from '../images-metadata.json'
import pages from '../pages-metadata.json'
import SiteMetadata from '../Contexts/SiteMetadata'

const useMetadata = (): SiteMetadata => {
  const [metadata, setMetadata] = useState<SiteMetadata>({
    imagesMetadata: new Map<string, string>(),
    pagesMetadata: new Map<string, number>()
  })

  useEffect(() => {
    setMetadata({
      imagesMetadata: new Map<string, string>(Object.entries(images)),
      pagesMetadata: new Map<string, number>(Object.entries(pages))
    })
  }, [])

  return metadata
}

export default useMetadata
