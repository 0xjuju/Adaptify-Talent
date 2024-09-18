import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import UserDashboard from './pages/UserDashboard';
import UserSettings from './pages/UserSettings';

function App() {
  return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </Router>
  )
}

export default App;