import axios from 'axios'

const BASE_URL = 'http://localhost:3002/api/mypocket'
const TODO_URL = 'http://localhost:3002/api/todos'

export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData)
}

export const loginUser = async (userData) => {
  return await axios.post(`${BASE_URL}/login`, userData)
}

export const createTodo = async (todoData) => {
  const token = localStorage.getItem('token')
  return await axios.post(`${TODO_URL}/create`, todoData, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const getTodos = async () => {
  const token = localStorage.getItem('token')
  return await axios.get(`${TODO_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const deleteTodo = async (id) => {
  const token = localStorage.getItem('token')
  return await axios.delete(`${TODO_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

//   updateTodo function
export const updateTodo = async (id, updatedData) => {
  const token = localStorage.getItem('token')
  return await axios.put(`${TODO_URL}/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
