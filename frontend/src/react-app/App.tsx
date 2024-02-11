import { BrowserRouter } from 'react-router-dom'
import './App.css'
import './index.css'
import Layout from './Layout'

export default function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
        <footer>
            <span>© 2024 Kevin Verreault</span>
        </footer>
      </div>
    </BrowserRouter>
  )
}
