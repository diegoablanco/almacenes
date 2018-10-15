const config = require('config')
const moment = require('moment')
const { BadRequest } = require('feathers-errors');
const path = require('path')
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
      async create({ reportType, options }) {
        const sequelize = getDatabase()
        const replacements = {
          dateFrom: options.dateFrom || null,
          dateTo: options.dateTo || moment().endOf('day').toDate(),
          receipt: options.receipt || null
        }
        try {
          const [receivedStocks] = await sequelize.query(receivedStock, { replacements })
          const [issuedStocks] = await sequelize.query(issuedStock, { replacements })
          const [actualStocks] = await sequelize.query(actualStock, { replacements })
          const [stockCounts] = await sequelize.query(stockCount, { replacements })

          return {
            sheets: [receivedStocks, issuedStocks, actualStocks, stockCounts],
            fileName: `Reporte de Stock ${replacements.dateFrom ? `del ${moment(replacements.dateFrom).format('D-MM-YYYY')}` : ''} al ${moment(replacements.dateTo).format('D-MM-YYYY')}.xlsx`
          }
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
	  },
    async (req, res) => {
      const template = xlsx.readFile(path.resolve(__dirname, 'stock', 'StockReportTemplate.xlsx'), { cellStyles: true, sheetStubs: true })
      const { sheets, fileName } = res.data
      sheets.forEach((data, index) => writeArrayToSheet({ sheet: template.Sheets[template.SheetNames[index]], array: data, startingAddress: { cell: 0, row: 1 } }))
      
      const result = xlsx.write(template, { type: 'buffer', bookType: 'xlsx', bookSST: true })
      res.setHeader('Content-Type', 'application/vnd.openxmlformats')
      res.setHeader('Content-Disposition', 'attachment; filename=Report.xlsx')
      res.set({ fileName })
      res.end(result, 'binary')
    }
  )
  const service = app.service(servicePath)
  service.hooks(hooks)
}

