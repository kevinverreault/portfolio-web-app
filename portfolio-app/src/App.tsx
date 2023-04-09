import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Accueil from './Components/Gallery/Home/Accueil'
import Faune from './Components/Gallery/Faune'
import Paysages from './Components/Gallery/Paysages'
import NavigationHeader from './Components/Header/NavigationHeader'
import Contact from './Components/Forms/Contact'
import { MetadataContext } from './Context/MetadataContext'
import { useAnalyticsEngine, usePageViewTracking } from './Hooks/useAnalytics'
import useMetadata from './Hooks/useMetadata'

export default function App () {
  useAnalyticsEngine()
  usePageViewTracking()
  const metadata = useMetadata()

  return (
        <div className="App">
          <MetadataContext.Provider value={metadata}>
            <NavigationHeader />
              <Routes>
                  <Route path="/" element={<Accueil />} />
                  <Route path="/faune" element={<Faune />} />
                  <Route path="/paysages" element={<Paysages />} />
                  <Route path="/contact" element={<Contact />} />
              </Routes>
            </MetadataContext.Provider>
            <footer>
                <span>© 2023 Kevin Verreault</span>
            </footer>
        </div>
  )
}
