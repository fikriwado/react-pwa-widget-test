import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Home from './pages/Home.jsx';
import Widget from './pages/Widget.jsx';
import Create from './pages/smoothies/Create.jsx';
import Smoothie from './pages/smoothies/Smoothie.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/smoothies'>
          <Route index element={<Smoothie />} />
          <Route path='create' element={<Create />} />
        </Route>
        <Route path='/widget' element={<Widget />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
