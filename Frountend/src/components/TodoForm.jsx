import React, { useState, useEffect } from 'react'
import { createTodo, updateTodo } from '../components/Api'
import { toast } from 'react-toastify'

const TodoForm = ({ refreshTodos, editTask, setEditTask }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'incomplete',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTask) {
      setTodo({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      })
    }
  }, [editTask])

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const errors = {}
    if (!todo.title.trim()) errors.title = 'Title is required'
    if (!todo.description.trim()) errors.description = 'Description is required'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      if (editTask) {
        await updateTodo(editTask.id, todo)
        toast.success(' Task Updated!')
        setEditTask(null)
      } else {
        await createTodo(todo)
        toast.success(' Todo Created!')
      }
      setTodo({ title: '', description: '', status: 'incomplete' })
      setErrors({})
      refreshTodos()
    } catch (err) {
      toast.error(err.response?.data?.message || ' Operation failed')
    }
  }

  return (
    <div className="container my-4">
      <form
        className="bg-white p-4 rounded shadow w-100"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <input
            className={`form-control ${
              errors.title ? 'border border-danger' : ''
            }`}
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="Enter Title"
          />
          {errors.title && (
            <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
              {errors.title}
            </div>
          )}
        </div>

        <div className="mb-3">
          <textarea
            className={`form-control ${
              errors.description ? 'border border-danger' : ''
            }`}
            name="description"
            value={todo.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
          {errors.description && (
            <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
              {errors.description}
            </div>
          )}
        </div>

        <div className="mb-3">
          <select
            className="form-control"
            name="status"
            value={todo.status}
            onChange={handleChange}
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <div className="d-flex flex-column flex-md-row gap-2">
          <button className="btn btn-primary w-100" type="submit">
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
          {editTask && (
            <button
              className="btn btn-secondary w-100"
              type="button"
              onClick={() => {
                setEditTask(null)
                setTodo({ title: '', description: '', status: 'incomplete' })
                setErrors({})
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TodoForm
