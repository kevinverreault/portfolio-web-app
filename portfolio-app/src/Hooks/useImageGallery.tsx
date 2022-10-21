import { useEffect } from 'react'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'

function useImageGallery () {
  useEffect(() => {
    Fancybox.bind('[data-fancybox]', { zoom: true, hideScrollbar: false, preload: 2 })
    return () => {
      Fancybox.destroy()
    }
  }, [])
}

export default useImageGallery
