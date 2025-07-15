import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../featuers/todo/todoSlice'
import { useNavigate } from 'react-router-dom'
import { logout } from '../featuers/todo/authSlice' //  Import logout action from authSlice
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const DashBoard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { todos, loading } = useSelector((state) => state.todo)
  const { user } = useSelector((state) => state.auth) //  Get user from Redux

  const [showFilter, setShowFilter] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout()) //  Redux logout
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
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-600">
          Hi, {user?.fullname || 'User'}
        </h2>
        <button
          className="border border-red-500 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow text-center">
          <p className="text-lg font-semibold">Total: {totalTasks}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-xl shadow text-center">
          <p className="text-lg font-semibold">Completed: {completedTasks}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-xl shadow text-center">
          <p className="text-lg font-semibold">Incomplete: {incompleteTasks}</p>
        </div>
        <div className="bg-yellow-400 text-black p-4 rounded-xl shadow text-center">
          <p className="text-lg font-semibold">Today: {todayTasks}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Add New Task</h3>
        <div className="relative inline-block text-left">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="border px-3 py-1 rounded-lg text-sm shadow hover:bg-gray-100"
            >
              Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                {['all', 'completed', 'incomplete', 'today'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilter(option)
                      setShowFilter(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      filter === option ? 'font-bold text-green-600' : ''
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading tasks...</p>}

      <TodoForm editTask={editTask} setEditTask={setEditTask} />
      <TodoList todos={filteredTodos} setEditTask={setEditTask} />
    </div>
  )
}

export default DashBoard
