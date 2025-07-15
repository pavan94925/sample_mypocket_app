import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'http://localhost:3002/api/todos'

// ✅ Fetch Todos
export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data.tasks
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch todos'
      )
    }
  }
)

// ✅ Create New Todo
export const createNewTodo = createAsyncThunk(
  'todo/createNewTodo',
  async (todo, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${BASE_URL}/create`, todo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data.task
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create todo'
      )
    }
  }
)

// ✅ Update Existing Todo
export const updateExistingTodo = createAsyncThunk(
  'todo/updateExistingTodo',
  async ({ id, todo }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`${BASE_URL}/update/${id}`, todo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data.task
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update todo'
      )
    }
  }
)

// ✅ Delete Existing Todo
export const deleteExistingTodo = createAsyncThunk(
  'todo/deleteExistingTodo',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete todo'
      )
    }
  }
)

// ✅ Todo Slice
const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })

      .addCase(updateExistingTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        )
        if (index !== -1) {
          state.todos[index] = action.payload
        }
      })

      .addCase(deleteExistingTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      })
  },
})

export default todoSlice.reducer
