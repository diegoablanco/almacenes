
const getDatabase = require('../server/database')
const sequelize = getDatabase()

const { models: {customer, phone} } = sequelize
customer.findAll({
  include:[phone]
}).then(function(customers){
  console.log(JSON.stringify(customers))
})