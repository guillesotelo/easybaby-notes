import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import './scss/app.scss'

const App: React.FC = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('E.A.S.Y Notes')
  return (
    <Routes>
      <Route path='/' element={
        <div className="root__container">
          <div className="menu__wrapper">
            <Header title={title} setTitle={setTitle} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
            <Sidebar />
          </div>
          <div className="root__main">
            <Toaster />
            <Home />
            <Footer />
          </div>
        </div>
      } />
      <Route path='*' element={
        <div className="root__container">
          <div className="menu__wrapper">
            <Header title={title} setTitle={setTitle} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
            <Sidebar />
          </div>
          <div className="root__main">
            <Toaster />
            <Home />
            <Footer />
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
