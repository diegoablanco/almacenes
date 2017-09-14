
const getDatabase = require('../server/database')
const sequelize = getDatabase()
sequelize.import('../server/models/customers.model')
sequelize.import('../server/models/warehouses.model')
sequelize.sync()