import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomeNSearch } from './pages/HomeNSearch'
import { SearchBar } from './components/SearchBar'
import RecipePage from './pages/RecipePage'
import Reviews from './pages/Reviews'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomeNSearch/>}/>
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/recipe/:id/reviews" element={<Reviews />} />
          <Route path="/recipePage" element={<RecipePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
