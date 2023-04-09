import { useEffect } from 'react'
import * as Cronitor from '@cronitorio/cronitor-rum-js'
import { useLocation } from 'react-router-dom'

const useAnalyticsEngine = () => {
  useEffect(() => {
    if (process.env.REACT_APP_ANALYTICS_KEY != null) {
      Cronitor.load(process.env.REACT_APP_ANALYTICS_KEY)
    }
  }, [])
}

const usePageViewTracking = () => {
  const location = useLocation()

  useEffect(() => {
    Cronitor.track('Pageview')
  }, [location])
}

export { useAnalyticsEngine, usePageViewTracking }
