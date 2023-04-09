import { useEffect, useState } from 'react'
import MetadataService from '../Services/MetadataService'

const useMetadata = (): Map<string, string> => {
  const [metadata, setMetadata] = useState(new Map<string, string>())

  useEffect(() => {
    setMetadata(MetadataService.getMetadata())
  }, [])

  return metadata
}

export default useMetadata
