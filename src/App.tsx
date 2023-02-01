import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import './scss/app.scss'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <div className="root-container">
          <Header />
          <Sidebar />
          <div className="root-main">
            <Home />
            <Footer />
          </div>
        </div>
      } />
      <Route element={
        <div className="root-container">
          <Header />
          <Sidebar />
          <div className="root-main">
            <Home />
            <Footer />
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
