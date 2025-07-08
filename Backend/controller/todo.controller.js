const db = require('../model/Db')
const Todo = db.todo_tasks

//  Create new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body
  const userId = req.user.id

  try {
    const taskData = {
      title,
      description,
      status: status || 'Incomplete',
      userId,
      startedAt: new Date(),
    }

    if (status?.toLowerCase() === 'complete') {
      taskData.completedAt = new Date()
    }

    const task = await Todo.create(taskData)

    res.status(201).json({
      message: 'Task created successfully',
      task,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get  tasks
exports.getTasks = async (req, res) => {
  const userId = req.user.id

  try {
    const tasks = await Todo.findAll({
      where: { userId },
      order: [['startedAt', 'DESC']],
    })

    res.status(200).json({
      message: 'Tasks fetched successfully',
      tasks,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//  Delete task
exports.deleteTask = async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.id

  try {
    const task = await Todo.findOne({ where: { id: taskId, userId } })

    if (!task) {
      return res
        .status(404)
        .json({ message: 'Task not found or not authorized' })
    }

    await task.destroy()
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update a task
exports.updateTask = async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.id
  const { title, description, status } = req.body

  try {
    const task = await Todo.findOne({ where: { id: taskId, userId } })

    if (!task) {
      return res
        .status(404)
        .json({ message: 'Task not found or not authorized' })
    }

    // Update fields
    task.title = title || task.title
    task.description = description || task.description
    task.status = status || task.status

    // Set or clear completedAt
    if (status?.toLowerCase() === 'complete') {
      task.completedAt = new Date()
    } else {
      task.completedAt = null
    }

    await task.save()

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
