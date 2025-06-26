import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Autor from './pages/autor/autor'
import Livro from './pages/livro/livro'
import Home from './pages/home/home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Autor" element={<Autor />} />
        <Route path="/livros" element={<Livro />} />
        <Route path='/Home' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
