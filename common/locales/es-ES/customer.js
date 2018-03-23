const address = require('./address.json')
const contact = require('./contact.json')
const account = require('./account')

module.exports = {
  companyName: 'Nombre de la Compañía',
  vat: 'VAT',
  address,
  account,
  authorizedSignatory: contact,
  authorizedPersons: contact
}
