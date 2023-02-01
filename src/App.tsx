import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './pages/Header'
import './App.css';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import Footer from './pages/Footer';

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
