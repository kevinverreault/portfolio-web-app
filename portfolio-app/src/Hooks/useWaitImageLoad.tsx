import { useState, useEffect } from 'react'

const useWaitImageLoad = (headerUrl: string) => {
  const [imageIsLoading, setimageIsLoading] = useState(true)

  useEffect(() => {
    const headerImage = new Image()
    headerImage.addEventListener('load', function () {
      setimageIsLoading(false)
    }, false)
    headerImage.src = headerUrl
  }, [headerUrl])

  return imageIsLoading
}

export default useWaitImageLoad
