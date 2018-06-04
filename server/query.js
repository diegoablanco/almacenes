const getDatabase = require('./database')

const sequelize = getDatabase()
const { models: { customer } } = sequelize
const log = console.log.bind(console)

async function test() {
  try {
    const movements = await sequelize.query(
    `SELECT id, date, 'issue' as type FROM stockAccountIssues sai
        WHERE sai.stockAccountId = :stockAccountId
        UNION (SELECT id, date, 'receive' as type FROM stockAccountReceives sar
        WHERE sar.stockAccountId = :stockAccountId)
        ORDER BY date DESC`,
      { replacements: { stockAccountId: 1 }, type: sequelize.QueryTypes.SELECT }
    )
    log(movements)
  } catch (e) {
    log(e)
  }
}
test()

