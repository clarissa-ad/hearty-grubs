import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomeNSearch } from './pages/HomeNSearch'
import { SearchBar } from './components/SearchBar'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomeNSearch/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
