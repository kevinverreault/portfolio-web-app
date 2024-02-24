import { useEffect, useState } from 'react'
import siteMetadata from '../../metadata.json'
import { type SiteMetadata } from '../Contexts/SiteMetadata'

const useMetadata = (): SiteMetadata => {
  const [metadata, setMetadata] = useState<SiteMetadata>(siteMetadata)

  useEffect(() => {
    setMetadata(siteMetadata)
  }, [siteMetadata])

  return metadata
}

export default useMetadata
