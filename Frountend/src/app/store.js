import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../featuers/todo/todoSlice'
import authReducer from '../featuers/todo/authSlice'

const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
})

export default store
