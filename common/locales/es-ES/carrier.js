const address = require('./address.json')
const contact = require('./contact')

module.exports = {
  companyName: 'Nombre de la Compañía',
  address,
  authorizedSignatory: contact,
  deleteDialog: {
    title: 'Eliminar Transportista',
    message: '¿Confirma eliminar el transportista?'
  }
}
