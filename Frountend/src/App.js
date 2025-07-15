import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css'

import AuthForm from './components/AuthForm'
import DashBoard from './components/DashBoard'
import ForgotPassword from './components/ForgotPassword'

function App() {
  const { token } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>
        {/* ✅ Default Route - Show AuthForm */}
        <Route
          path="/"
          element={!token ? <AuthForm /> : <Navigate to="/dashboard" />}
        />

        {/* ✅ Dashboard - Protected */}
        <Route
          path="/dashboard"
          element={token ? <DashBoard /> : <Navigate to="/" />}
        />

        {/* ✅ Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App
