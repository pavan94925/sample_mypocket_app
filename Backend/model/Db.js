const { Sequelize, DataTypes } = require('sequelize')

//  Create DB connection
const sequelize = new Sequelize(
  'mysql://root:Connect123@localhost:7866/mypocket'
)

const mypocket_info = require('./user')(sequelize, DataTypes)
const todo_tasks = require('./todo')(sequelize, DataTypes)

//   user to many tasks
mypocket_info.hasMany(todo_tasks, { foreignKey: 'userId' })
todo_tasks.belongsTo(mypocket_info, { foreignKey: 'userId' })

module.exports = { sequelize, mypocket_info, todo_tasks }
