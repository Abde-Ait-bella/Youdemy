import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Users from './pages/Users';
import Navbar from './components/Navbar';

const App = () => {
  const user = sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isAdmin, setIsAdmin] = useState(user?.role === 'admin');

  const handleLogin = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    setIsAuthenticated(user !== null);
    setIsAdmin(user?.role === 'admin');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/courses"
          element={isAuthenticated ? <Courses /> : <Navigate to="/login" replace />}
          // element={<Courses />}
        />
        {isAuthenticated && isAdmin && (
          <>
            <Route path="/categories" element={<Categories />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/users" element={<Users />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/courses" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
