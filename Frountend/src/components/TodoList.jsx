// src/components/TodoList.jsx
import React, { useState } from 'react'
import { deleteTodo, updateTodo } from '../components/Api'
import { toast } from 'react-toastify'

const TodoList = ({ todos, refreshTodos, setEditTask }) => {
  const [editTaskLocal, setEditTaskLocal] = useState(null)

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(id)
        toast.success('🗑️ Task deleted successfully')
        refreshTodos()
      } catch (err) {
        toast.error(err.response?.data?.message || '❌ Failed to delete task')
      }
    }
  }

  const handleSaveEdit = async () => {
    try {
      await updateTodo(editTaskLocal.id, editTaskLocal)
      toast.success('✅ Task updated successfully')
      setEditTaskLocal(null)
      refreshTodos()
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Failed to update task')
    }
  }

  const handleCancelEdit = () => {
    setEditTaskLocal(null)
  }

  return (
    <div className="container mt-4">
      <h4 className="text-center text-secondary mb-4 fw-bold">
        Your Todo Tasks
      </h4>

      {todos.length === 0 ? (
        <p className="text-center text-muted">No tasks available</p>
      ) : (
        <div className="row">
          {todos.map((task) => (
            <div className="col-md-4 mb-4" key={task.id}>
              <div className="shadow-sm h-100 rounded-4 p-3 bg-white">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h5
                      className="fw-larg text-muted"
                      style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {task.title}
                      {task.status.toLowerCase() === 'complete' ? (
                        <span className="badge bg-success ms-2">✔️ Done</span>
                      ) : (
                        <span className="badge bg-warning text-dark ms-2">
                          ❌ Not Done
                        </span>
                      )}
                    </h5>
                    <p
                      style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {task.description}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Started:</strong>{' '}
                      {new Date(task.startedAt).toLocaleString()}
                    </p>
                    {task.completedAt && (
                      <p className="text-success mb-2">
                        <strong>Completed:</strong>{' '}
                        {new Date(task.completedAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setEditTaskLocal(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal UI for Edit Task */}
      {/* Modal UI for Edit Task */}
      {editTaskLocal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content shadow-lg rounded">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Edit Task</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCancelEdit}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editTaskLocal.title}
                        onChange={(e) =>
                          setEditTaskLocal({
                            ...editTaskLocal,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={editTaskLocal.description}
                        onChange={(e) =>
                          setEditTaskLocal({
                            ...editTaskLocal,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={editTaskLocal.status}
                        onChange={(e) =>
                          setEditTaskLocal({
                            ...editTaskLocal,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Incomplete">Incomplete</option>
                        <option value="Complete">Complete</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  )
}

export default TodoList

