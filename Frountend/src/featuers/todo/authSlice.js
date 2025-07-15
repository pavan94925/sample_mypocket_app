import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'http://localhost:3002/api/mypocket'

// ✅ Register User Thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData)
      return response.data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to register'
      )
    }
  }
)

// ✅ Login User Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to login')
    }
  }
)

// ✅ Forgot Password Thunk
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, userData)
      return response.data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to reset password'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    clearMessages: (state) => {
      state.error = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.message = 'Registration successful'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ✅ Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ✅ Forgot Password Cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// ✅ Export actions from slice
export const { logout, clearMessages } = authSlice.actions

// ✅ Export reducer as default
export default authSlice.reducer
