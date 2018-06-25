const config = require('config')
const { BadRequest } = require('feathers-errors');
const path = require('path')
const fs = require('fs')
const hooks = require('./hooks')
const getDatabase = require('../../../server/database')
const xlsx = require('xlsx')
const { receivedStock, issuedStock, actualStock, stockCount } = require('./queries')
const { writeArrayToSheet } = require('./helpers')


const servicePath = `${config.apiPath}/reports`


module.exports = function () {
  const app = this
  app.use(
    servicePath,
    {
      async get(a, b, c) {
        const sequelize = getDatabase()
        const select = `SELECT id, date, 'issue' as type FROM stockAccountIssues sai
          WHERE sai.stockAccountId = :stockAccountId
          UNION (SELECT id, date, 'receive' as type FROM stockAccountReceives sar
          WHERE sar.stockAccountId = :stockAccountId)`
        try {
          const [receivedStocks] = await sequelize.query(receivedStock)
          const [issuedStocks] = await sequelize.query(issuedStock)
          const [actualStocks] = await sequelize.query(actualStock)
          const [stockCounts] = await sequelize.query(stockCount)
          return [receivedStocks, issuedStocks, actualStocks, stockCounts]
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
	  },
    async (req, res) => {
      const template = xlsx.readFile('./server/services/reports/stock/StockReportTemplate.xlsx', { cellStyles: true, sheetStubs: true })
      res.data.forEach((data, index) => writeArrayToSheet({ sheet: template.Sheets[template.SheetNames[index]], array: data, startingAddress: { cell: 0, row: 1 } }))
      
      const result = xlsx.write(template, { type: 'buffer', bookType: 'xlsx', bookSST: true })
      res.setHeader('Content-Type', 'application/vnd.openxmlformats')
      res.setHeader('Content-Disposition', 'attachment; filename=Report.xlsx')
      res.end(result, 'binary')
    }
  )
  const service = app.service(servicePath)
  // service.hooks(hooks)
}

