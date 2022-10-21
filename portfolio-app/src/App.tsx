import './App.css'
import './index.css'
import { useLocation, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Accueil from './Accueil'
import Faune from './Faune'
import Paysages from './Paysages'
import NavigationHeader from './NavigationHeader'
import Contact from './Contact'
import * as Panelbear from '@panelbear/panelbear-js'

export default function App () {
  const location = useLocation()

  useEffect(() => {
    if (process.env.REACT_APP_ANALYTICS_KEY != null) {
      Panelbear.load(process.env.REACT_APP_ANALYTICS_KEY)
    }
  }, [])

  useEffect(() => {
    Panelbear.trackPageview()
  }, [location])

  return (
        <div className="App">
            <NavigationHeader />
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/faune" element={<Faune />} />
                <Route path="/paysages" element={<Paysages />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <footer>
                <span>© 2022 Kevin Verreault</span>
            </footer>
        </div>
  )
}
