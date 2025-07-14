import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../components/Api'

// ✅ Thunks for API calls

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTodos()
      return response.data.tasks
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch todos'
      )
    }
  }
)

export const createNewTodo = createAsyncThunk(
  'todo/createNewTodo',
  async (todo, { rejectWithValue }) => {
    try {
      const response = await createTodo(todo)
      return response.data.task
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create todo'
      )
    }
  }
)

export const updateExistingTodo = createAsyncThunk(
  'todo/updateExistingTodo',
  async ({ id, todo }, { rejectWithValue }) => {
    try {
      const response = await updateTodo(id, todo)
      return response.data.task
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update todo'
      )
    }
  }
)

export const deleteExistingTodo = createAsyncThunk(
  'todo/deleteExistingTodo',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTodo(id)
      return id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete todo'
      )
    }
  }
)

// ✅ Slice

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
      // ✅ Fetch Todos
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

      // ✅ Create Todo
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })

      // ✅ Update Todo
      .addCase(updateExistingTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        )
        if (index !== -1) {
          state.todos[index] = action.payload
        }
      })

      // ✅ Delete Todo
      .addCase(deleteExistingTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      })
  },
})

export default todoSlice.reducer
