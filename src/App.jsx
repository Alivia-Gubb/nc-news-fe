
import { Route, Routes } from 'react-router-dom'
import Articles from '../components/Articles'
import './App.css'

function App() {
  return (
    <header>
      <h1>NC News</h1>
          <Routes>
            <Route path='/' element={<Articles />} />
          </Routes>
    </header>
  )
}

export default App
