import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Accueil from './Components/Gallery/Home/Accueil'
import Faune from './Components/Gallery/Faune'
import Paysages from './Components/Gallery/Paysages'
import NavigationHeader from './Components/Header/NavigationHeader'
import Contact from './Components/Forms/Contact'
import { MetadataContext } from './Contexts/MetadataContext'
import useMetadata from './Hooks/useMetadata'
import { PostHogProvider } from 'posthog-js/react'
import { usePageViewTracking } from './Hooks/useAnalytics'

export default function App () {
  const metadata = useMetadata()
  usePageViewTracking()

  return (
    <div className="App">
      <MetadataContext.Provider value={metadata}>
        <PostHogProvider
          apiKey={process.env.REACT_APP_ANALYTICS_KEY}
          options={{
            api_host: process.env.REACT_APP_PUBLIC_ANALYTICS_HOST
          }}>
          <NavigationHeader />
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/faune" element={<Faune />} />
                <Route path="/paysages" element={<Paysages />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
          </PostHogProvider>
        </MetadataContext.Provider>
        <footer>
            <span>© 2024 Kevin Verreault</span>
        </footer>
    </div>
  )
}
