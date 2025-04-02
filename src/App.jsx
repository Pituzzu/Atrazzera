import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Categoria from './pages/Categoria'
import Articolo from './pages/Articolo'
import Post from './pages/Post'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articolo" element={<Articolo />} />
        <Route path="/post" element={<Post />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    
  )
}

export default App
