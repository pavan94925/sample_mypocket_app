// src/components/TodoList.jsx
import { deleteTodo } from '../components/Api'
import { toast } from 'react-toastify'

const TodoList = ({ todos, refreshTodos, setEditTask }) => {
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
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-primary fw-bold">
                       {task.title}
                      {task.status.toLowerCase() === 'complete' ? (
                        <span className="badge bg-success ms-2">✔️ Done</span>
                      ) : (
                        <span className="badge bg-warning text-dark ms-2">
                          ❌ Not Done
                        </span>
                      )}
                    </h5>
                    <p className="card-text">{task.description}</p>

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
                      onClick={() => setEditTask(task)}
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
    </div>
  )
}

export default TodoList
