import './App.css'
import './index.css'
import { useLocation, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Accueil from './Accueil'
import Faune from './Faune'
import Paysages from './Paysages'
import NavigationHeader from './NavigationHeader'
import Contact from './Contact'
import * as Cronitor from '@cronitorio/cronitor-rum-js'
import MetadataService from './Services/MetadataService'
import { MetadataContext } from './Context/MetadataContext'

export default function App () {
  const location = useLocation()

  const [metadata, setMetadata] = useState(new Map<string, string>())

  useEffect(() => {
    if (process.env.REACT_APP_ANALYTICS_KEY != null) {
      Cronitor.load(process.env.REACT_APP_ANALYTICS_KEY)
    }

    setMetadata(MetadataService.getMetadata())
  }, [])

  useEffect(() => {
    Cronitor.track('Pageview')
  }, [location])

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
