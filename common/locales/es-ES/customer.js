const address = require('./address.json')
const contact = require('./contact')
const account = require('./account')

module.exports = {
  companyName: 'Nombre de la Compañía',
  vat: 'VAT',
  address,
  account,
  authorizedSignatory: contact,
  authorizedPersons: contact,
  deleteDialog: {
    title: 'Eliminar Cliente',
    message: '¿Confirma eliminar el cliente?'
  }
}
