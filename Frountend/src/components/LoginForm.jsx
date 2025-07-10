import React, { useState } from 'react'
import { loginUser } from '../components/Api'
import { validateLogin } from '../components/Validation'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedValue = name === 'email' ? value.toLowerCase() : value
    setFormData({ ...formData, [name]: updatedValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateLogin(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await loginUser(formData)

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        toast.success(' Login successful!')
        navigate('/dashboard')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed')
      }
    }
  }

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center p-5">
          <h1 className="text-danger fw-bold display-4">Mypocket</h1>
          <h2 className="fs-5 mt-3">
            "The 'mypocket' app is ready to simplify your financial life, one
            transaction at a time."
          </h2>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow p-4 w-75">
            <h3 className="text-center mb-3">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>

              <button
                className="btn btn-danger w-100"
                style={{ height: '50px' }}
                type="submit"
              >
                Log In
              </button>

              <div className="text-center mt-2">
                <Link to="/forgot-password">Forgotten password?</Link>
              </div>
            </form>

            <hr />
            <Link to="/register">
              <button
                className="btn btn-primary w-100"
                style={{ height: '50px' }}
              >
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Toast container to show toast messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default LoginForm
