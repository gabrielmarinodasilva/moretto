import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/Home'
import Main from './pages/main'
import Master from './pages/Master'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Autor" element={<Home />} />
        <Route path="/livros" element={<Main />} />
        <Route path='/Home' element={<Master />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
