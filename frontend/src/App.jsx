import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomeNSearch } from './pages/HomeNSearch'
import { SearchBar } from './components/SearchBar'
import RecipePage from './pages/RecipePage'
import Reviews from './pages/Reviews'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomeNSearch/>}/>
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/recipe/:id/reviews" element={<Reviews />} />
          <Route path="/recipePage" element={<RecipePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
