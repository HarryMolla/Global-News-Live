import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsDetail from './pages/NewsDetail.jsx';
import Layout from './pages/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<App/>} />
      <Route path="article/:id" element={<NewsDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
