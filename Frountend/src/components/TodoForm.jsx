import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { createNewTodo, updateExistingTodo } from '../featuers/todo/todoSlice'

const TodoForm = ({ editTask, setEditTask }) => {
  const dispatch = useDispatch()

  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'incomplete',
  })

  const [errors, setErrors] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (editTask) {
      setTodo({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      })
      setShowModal(true)
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

  const resetForm = () => {
    setShowModal(false)
    setEditTask(null)
    setErrors({})
    setTodo({ title: '', description: '', status: 'incomplete' })
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
        await dispatch(updateExistingTodo({ id: editTask.id, todo })).unwrap()
        toast.success('✅ Task Updated!')
      } else {
        await dispatch(createNewTodo(todo)).unwrap()
        toast.success('✅ Task Created!')
      }
      resetForm()
    } catch (err) {
      toast.error(err || '❌ Operation failed')
    }
  }

  return (
    <>
      <button
        className="btn btn-outline-primary fw-bold px-4 py-2 rounded-pill shadow-sm"
        onClick={() => setShowModal(true)}
      >
        Add New Task
      </button>

      {showModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1050,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className="bg-white rounded-4 shadow-lg p-4 w-100"
              style={{ maxWidth: '500px' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0 text-primary fw-bold">
                  {editTask ? ' Edit Task' : ' Add New Task'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className={`form-control ${
                      errors.title ? 'is-invalid' : ''
                    }`}
                    value={todo.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className={`form-control ${
                      errors.description ? 'is-invalid' : ''
                    }`}
                    value={todo.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={todo.status}
                    onChange={handleChange}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editTask ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TodoForm
