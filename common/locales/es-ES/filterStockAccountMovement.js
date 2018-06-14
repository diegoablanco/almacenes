const { receipt } = require('./stockAccountMovement')
const { dateFrom, dateTo } = require('./common')

module.exports = {
  receipt,
  type: 'Tipo de Movimiento',
  dateFrom,
  dateTo
}
