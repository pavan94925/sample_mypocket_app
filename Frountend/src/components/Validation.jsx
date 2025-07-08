export const validateRegistration = (values) => {
  const errors = {}

  if (!values.fullname.trim()) {
    errors.fullname = 'Name is required'
  } else if (values.fullname.length < 3 || values.fullname.length > 50) {
    errors.fullname = 'Name must be 3–50 characters'
  } else if (!/^[A-Za-z\s]+$/.test(values.fullname)) {
    errors.fullname = 'Only letters and spaces allowed'
  }

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(values.email)) {
    errors.email = 'Enter a valid email'
  } else if (!values.email.endsWith('@gmail.com')) {
    errors.email = 'Only @gmail.com emails are allowed'
  } else if (/[A-Z]/.test(values.email)) {
    errors.email = 'Email must be in lowercase only'
  } else if (values.email.length > 50) {
    errors.email = 'Email must be less than 50 characters'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else {
    if (values.password.length < 6) {
      errors.password = 'Min 6 characters'
    }
    if (!/[A-Z]/.test(values.password)) {
      errors.password = 'Must contain uppercase letter'
    }
    if (!/[a-z]/.test(values.password)) {
      errors.password = 'Must contain lowercase letter'
    }
    if (!/[0-9]/.test(values.password)) {
      errors.password = 'Must contain number'
    }
    if (!/[@$!%*?&]/.test(values.password)) {
      errors.password = 'Must contain special character'
    }
  }

  // ✅ Confirm Password check
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export const validateLogin = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  } else if (values.email.length > 100) {
    errors.email = 'Email must be less than 100 characters'
  } else if (!values.email.endsWith('@gmail.com')) {
    errors.email = 'Only @gmail.com emails are allowed'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

export const validateForgotPassword = (values) => {
  const errors = {}

  // Email check
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(values.email)) {
    errors.email = 'Enter a valid email'
  } else if (!values.email.endsWith('@gmail.com')) {
    errors.email = 'Only @gmail.com emails are allowed'
  } else if (/[A-Z]/.test(values.email)) {
    errors.email = 'Email must be lowercase'
  }

  // New password validation
  if (!values.newPassword) {
    errors.newPassword = 'New password is required'
  } else {
    if (values.newPassword.length < 6) {
      errors.newPassword = 'Min 6 characters'
    }
    if (!/[A-Z]/.test(values.newPassword)) {
      errors.newPassword = 'Must contain uppercase letter'
    }
    if (!/[a-z]/.test(values.newPassword)) {
      errors.newPassword = 'Must contain lowercase letter'
    }
    if (!/[0-9]/.test(values.newPassword)) {
      errors.newPassword = 'Must contain number'
    }
    if (!/[@$!%*?&]/.test(values.newPassword)) {
      errors.newPassword = 'Must contain special character'
    }
  }

  // ✅ Confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}
