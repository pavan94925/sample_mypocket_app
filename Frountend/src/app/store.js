import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../featuers/todo/todoSlice'

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
})

export default store
