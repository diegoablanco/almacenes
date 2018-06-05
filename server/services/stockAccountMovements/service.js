const config = require('config')
const { BadRequest } = require('feathers-errors')
const hooks = require('./hooks')
const getDatabase = require('../../../server/database')

const servicePath = `${config.apiPath}/stockAccountMovements`
module.exports = function () {
  const app = this
  app.use(
    servicePath,
    {
      async find({ query: { $sort } }) {
        const sequelize = getDatabase()
        const sortColumn = Object.keys($sort)[0]
        const sortOrder = Object.values($sort)[0] === '1' ? 'ASC' : 'DESC'
        const select = `SELECT id, date, 'issue' as type FROM stockAccountIssues sai
          WHERE sai.stockAccountId = :stockAccountId
          UNION (SELECT id, date, 'receive' as type FROM stockAccountReceives sar
          WHERE sar.stockAccountId = :stockAccountId)`
        const orderAndOffset = `ORDER BY ${sortColumn} ${sortOrder} OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`
        const selectCount = `SELECT count(id) AS [count] FROM (${select}) c`
        try {
          const [{ count }, ...results] = await sequelize.query(`${selectCount}; ${select} ${orderAndOffset};`,
            { replacements: { stockAccountId: 1 }, type: sequelize.QueryTypes.SELECT }
          )
          return {
            total: count,
            data: results,
            limit: 0,
            skip: 0
          }
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
    }
  )
  const service = app.service(servicePath)

  service.hooks(hooks)
}
