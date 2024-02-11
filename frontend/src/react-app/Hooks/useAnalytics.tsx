import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePostHog } from 'posthog-js/react'

type TrackImageClickedEvent = (imageName: string, description: string) => void

const useImageClickedTracking = (): TrackImageClickedEvent => {
  const engine = usePostHog()

  const trackImageClickedEvent = (imageName: string, imageDescription: string) => {
    engine?.capture('Imageclicked', {
      image: imageName,
      description: imageDescription
    })
  }

  return trackImageClickedEvent
}

const usePageViewTracking = () => {
  const engine = usePostHog()
  const location = useLocation()

  useEffect(() => {
    engine?.capture('$pageview')
  }, [location])
}

export { useImageClickedTracking, usePageViewTracking }
