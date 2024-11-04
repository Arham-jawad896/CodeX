// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import LessonPage from './components/LessonPage';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './components/AuthContext';
import Logout from './components/Logout';
import Playground from './components/Playground';
import Chatbot from './pages/Chatbot';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lessons/:courseId" element={<LessonPage />} /> {/* Updated route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
