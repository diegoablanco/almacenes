
const getDatabase = require('../server/database')
const sequelize = getDatabase()

sequelize.sync({force: true}).then(function(){
  const { customer, address, phoneType } = sequelize.models
  phoneType.bulkCreate([{ description: "Móvil"},{ description: "Oficina"},{ description: "Particular"}])
  customer.create({ companyName: "sabre", email: "das@sdf.com" }).then(customer1 =>{
    address.create({ line1: "honorio pueyrredón", zipCode: "1414"}).then(address1 =>
      customer1.setAddress(address1)  
    )    
  })
})