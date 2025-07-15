import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, loginUser } from '../featuers/todo/authSlice'
import { toast } from 'react-toastify'
import { validateRegistration, validateLogin } from '../components/Validation'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const [isRegister, setIsRegister] = useState(true)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = isRegister
      ? validateRegistration(formData)
      : validateLogin(formData)

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      if (isRegister) {
        await dispatch(registerUser(formData)).unwrap()
        toast.success(' Registered successfully')
      } else {
        await dispatch(loginUser(formData)).unwrap()
        toast.success(' Logged in successfully')
        navigate('/dashboard')
      }

      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (err) {
      toast.error(err || ' Operation failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-500">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="form-control rounded-lg shadow-sm"
              />
              {errors.fullname && (
                <small className="text-danger">{errors.fullname}</small>
              )}
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-lg shadow-sm"
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control rounded-lg shadow-sm pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {isRegister && (
            <div>
              <label className="block font-semibold mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control rounded-lg shadow-sm pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <small className="text-danger">{errors.confirmPassword}</small>
              )}
            </div>
          )}

          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 text-black py-2 px-4 w-full rounded-lg shadow"
            disabled={loading}
          >
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>

          {!isRegister && (
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link p-0 text-success fw-bold"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="text-center">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              className="btn btn-link p-0 text-success fw-bold"
              onClick={() => {
                setIsRegister(!isRegister)
                setErrors({})
                setFormData({
                  fullname: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                })
              }}
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
