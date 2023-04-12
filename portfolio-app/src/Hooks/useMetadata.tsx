import { useEffect, useState } from 'react'
import metadataFile from '../metadata.json'

const useMetadata = (): Map<string, string> => {
  const [metadata, setMetadata] = useState(new Map<string, string>())

  useEffect(() => {
    setMetadata(new Map<string, string>(Object.entries(metadataFile)))
  }, [])

  return metadata
}

export default useMetadata
