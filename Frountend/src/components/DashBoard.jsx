// src/components/DashBoard.jsx
import React, { useState, useEffect } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { getTodos } from '../components/Api'

const DashBoard = () => {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)
  const [filter, setFilter] = useState('all')
  const [editTask, setEditTask] = useState(null)

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

  // ✅ Filter logic
  const today = new Date().toISOString().split('T')[0]
  const filteredTodos = todos.filter((task) => {
    const startedDate = new Date(task.startedAt).toISOString().split('T')[0]
    if (filter === 'completed') return task.status.toLowerCase() === 'complete'
    if (filter === 'incomplete') return task.status.toLowerCase() !== 'complete'
    if (filter === 'today') return startedDate === today
    return true
  })

  // ✅ Stats calculation
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
      <h2 className="text-2xl font-bold text-center mb-4">
        Welcome, {user?.fullname || 'User'} 
      </h2>

      {/*  Stats */}
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

      <TodoForm
        refreshTodos={fetchTodos}
        editTask={editTask}
        setEditTask={setEditTask}
      />

      {/* ✅ Filter Buttons */}
      <div className="text-center my-4">
        <button
          onClick={() => setFilter('all')}
          className="btn btn-sm btn-outline-dark me-2"
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className="btn btn-sm btn-outline-success me-2"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          className="btn btn-sm btn-outline-warning me-2"
        >
          Incomplete
        </button>
        <button
          onClick={() => setFilter('today')}
          className="btn btn-sm btn-outline-primary"
        >
          Today
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        refreshTodos={fetchTodos}
        setEditTask={setEditTask}
      />
    </div>
  )
}

export default DashBoard
