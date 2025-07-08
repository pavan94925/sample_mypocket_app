import React, { useState } from 'react'
import { validateRegistration } from '../components/Validation'
import { registerUser } from '../components/Api'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '', // ✅ Add this
  })

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
    console.log('Submit clicked ✅')

    const validationErrors = validateRegistration(formData)
    console.log('Validation Errors:', validationErrors)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        await registerUser(formData)
        alert('✅ Registration successful!')
        navigate('/') // Navigate to login page
      } catch (error) {
        console.log(error.response?.data)
        alert(error.response?.data?.message || '❌ Registration failed')
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <div className="invalid-feedback">{errors.fullname}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
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
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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

          {/*  Confirm Password Field */}
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`form-control ${
                errors.confirmPassword ? 'is-invalid' : ''
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            style={{ height: '50px' }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
