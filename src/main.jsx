import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsDetail from './pages/NewsDetail.jsx';
import Layout from './pages/Layout.jsx';
import LetsConnect from './pages/LetsConnect.jsx';
import HowIBuiltThis from './pages/HowIBuiltThis.jsx';
import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<App/>} />
      <Route path="/article/:id" element={<NewsDetail/>} />
      <Route path='/LetsConnect' element={<LetsConnect/>}/>
      <Route path='/HowIBuiltThis' element={<HowIBuiltThis/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
