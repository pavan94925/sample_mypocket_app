import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearMessages } from '../featuers/todo/authSlice'
import { toast } from 'react-toastify'
import { validateForgotPassword } from '../components/Validation'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { loading, error, successMessage } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validateForgotPassword(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    dispatch(forgotPassword(formData))
  }

  useEffect(() => {
    if (error) toast.error(error)
    if (successMessage) toast.success(successMessage)

    return () => {
      dispatch(clearMessages())
    }
  }, [error, successMessage, dispatch])

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm w-50 mx-auto">
        <h4 className="text-center mb-3">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-control"
            />
            {errors.newPassword && (
              <small className="text-danger">{errors.newPassword}</small>
            )}
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
