// src/components/DashBoard.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { getTodos } from '../components/Api'

const DashBoard = () => {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)
  const [filter, setFilter] = useState('all')
  const [editTask, setEditTask] = useState(null)

  const navigate = useNavigate()

  const fetchTodos = async () => {
    try {
      const response = await getTodos()
      setTodos(response.data.tasks)
    } catch (err) {
      console.error('Failed to load todos:', err.message)
    }
  }

  useEffect(() => {
    fetchTodos()
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    alert('Logged out successfully!')
    navigate('/')
  }

  const today = new Date().toISOString().split('T')[0]
  const filteredTodos = todos.filter((task) => {
    const startedDate = new Date(task.startedAt).toISOString().split('T')[0]
    if (filter === 'completed') return task.status.toLowerCase() === 'complete'
    if (filter === 'incomplete') return task.status.toLowerCase() !== 'complete'
    if (filter === 'today') return startedDate === today
    return true
  })

  const totalTasks = todos.length
  const completedTasks = todos.filter(
    (t) => t.status.toLowerCase() === 'complete'
  ).length
  const incompleteTasks = todos.filter(
    (t) => t.status.toLowerCase() !== 'complete'
  ).length
  const todayTasks = todos.filter(
    (t) => new Date(t.startedAt).toISOString().split('T')[0] === today
  ).length

  return (
    <div className="container mx-auto p-4">
      {/* Welcome + Logout row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-2xl font-bold">Hi, {user?.fullname || 'User'}</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="row text-center mb-4">
        <div className="col">
          <div className="p-3 bg-primary text-white rounded shadow">
            <strong>Total:</strong> {totalTasks}
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-success text-white rounded shadow">
            <strong>Completed:</strong> {completedTasks}
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-danger text-white rounded shadow">
            <strong>Incomplete:</strong> {incompleteTasks}
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-warning text-dark rounded shadow">
            <strong>Today:</strong> {todayTasks}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Add New Task</h5>
        <div className="dropdown">
          <button
            className="btn btn-outline-dark btn-sm dropdown-toggle"
            type="button"
            id="filterDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
             Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
          <ul className="dropdown-menu" aria-labelledby="filterDropdown">
            {['all', 'completed', 'incomplete', 'today'].map((option) => (
              <li key={option}>
                <button
                  className={`dropdown-item d-flex justify-content-between align-items-center ${
                    filter === option ? 'active fw-bold' : ''
                  }`}
                  onClick={() => setFilter(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                  {filter === option && <span>✔</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TodoForm
        refreshTodos={fetchTodos}
        editTask={editTask}
        setEditTask={setEditTask}
      />

      <TodoList
        todos={filteredTodos}
        refreshTodos={fetchTodos}
        setEditTask={setEditTask}
      />
    </div>
  )
}

export default DashBoard
