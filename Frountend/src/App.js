// src/App.js

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'react-toastify/dist/ReactToastify.css'

// Component Imports
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import DashBoard from './components/DashBoard'
import ForgotPassword from './components/ForgotPassword'

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route → Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Registration Page */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard Page (for Todos etc.) */}
        <Route path="/dashboard" element={<DashBoard />} />

        {/* Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App
