const config = require('config')
const moment = require('moment')
const { BadRequest } = require('feathers-errors');
const path = require('path')
const hooks = require('./hooks')
const getDatabase = require('../../../server/database')
const xlsx = require('xlsx')
const queries = require('./queries')
const { writeArrayToSheet } = require('./helpers')

const servicePath = `${config.apiPath}/reports`


module.exports = function () {
  const app = this
  app.use(
    servicePath,
    {
      async create({ reportType, options }) {
        const sequelize = getDatabase()
        try {
          switch (reportType) {
            case 'stock':
            {
              const replacements = {
                dateFrom: options.dateFrom || null,
                dateTo: options.dateTo || moment().endOf('day').toDate(),
                receipt: options.receipt || null
              }
              const { receivedStock, issuedStock, actualStock, stockCount } = queries
              const [receivedStocks] = await sequelize.query(receivedStock, { replacements })
              const [issuedStocks] = await sequelize.query(issuedStock, { replacements })
              const [actualStocks] = await sequelize.query(actualStock, { replacements })
              const [stockCounts] = await sequelize.query(stockCount, { replacements })

              return {
                sheets: [receivedStocks, issuedStocks, actualStocks, stockCounts],
                fileName: `Reporte de Stock ${replacements.dateFrom ? `del ${moment(replacements.dateFrom).format('D-MM-YYYY')}` : ''} al ${moment(replacements.dateTo).format('D-MM-YYYY')}.xlsx`,
                templateName: 'StockReportTemplate.xlsx'
              }
            }
            case 'stockValue':
            {
              const replacements = {
                dateFrom: options.dateFrom || null,
                dateTo: options.dateTo || moment().endOf('day').toDate()
              }
              const { maxStockValue, stockValueDetailByDate } = queries
              const [[{ date }]] = await sequelize.query(maxStockValue, { replacements })
              const [dailyStockValues] = await sequelize.query(stockValueDetailByDate, { replacements: { date } })

              return {
                sheets: [dailyStockValues],
                fileName: `Reporte de Stock Valorizado ${replacements.dateFrom ? `del ${moment(replacements.dateFrom).format('D-MM-YYYY')}` : ''} al ${moment(replacements.dateTo).format('D-MM-YYYY')}.xlsx`,
                templateName: 'StockValueTemplate.xlsx'
              }
            }
            default:
              break;
          }
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
    },
    async (req, res) => {
      const { sheets, fileName, templateName } = res.data
      const template = xlsx.readFile(path.resolve(__dirname, 'stock', templateName), { cellStyles: true, sheetStubs: true })
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

