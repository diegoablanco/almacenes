const getDatabase = require('../../../../server/database')

module.exports = async (stock, code, transaction) => {
  if (code === 'edit') return
  const { models: { stockStatus } } = getDatabase()
  const status = await stockStatus.find({ where: { code } })
  await stock.setStatus(status.id, { transaction })
}
