const { reference, customerId, targetCustomerId } = require('./stock')
const { dateFrom, dateTo } = require('./common')

module.exports = {
  reference,
  status: 'Status',
  customerId,
  targetCustomerId,
  dateFrom,
  dateTo
}
