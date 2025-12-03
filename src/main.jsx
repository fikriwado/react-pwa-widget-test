import './styles/main.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Home from './pages/Home.jsx';
import Widget from './pages/Widget.jsx';
import Create from './pages/smoothies/Create.jsx';
import Smoothie from './pages/smoothies/Index.jsx';
import Update from './pages/smoothies/Update.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import SmoothieLayout from './layouts/SmoothieLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/auth'>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='/smoothies' element={<SmoothieLayout />}>
            <Route index element={<Smoothie />} />
            <Route path=':id' element={<Update />} />
            <Route path='create' element={<Create />} />
          </Route>

          <Route path='/widget' element={<Widget />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
