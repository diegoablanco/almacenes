const config = require('config')
const { BadRequest } = require('feathers-errors');
const path = require('path')
const fs = require('fs')
const hooks = require('./hooks')
const getDatabase = require('../../../server/database')
const nodeExcel = require('excel-export')
const { receivedStock } = require('./queries')


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
          const [results] = await sequelize.query(`${receivedStock}`)
          return results
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
	  },
    async (req, res) => {
      const reportConfig =
        [{
          stylesXmlFile: './server/services/reports/stockReportStyle.xml',
          name: 'Entradas',
          rows: res.data.map(Object.values),
          cols: [
            {
              caption: 'Fecha',
              width: 10
            },
            {
              caption: 'EMEI',
              width: 15
            },
            {
              caption: 'Descripción',
              width: 80
            },
            {
              caption: 'EAN',
              width: 15
            }
          ]
        },{
          stylesXmlFile: './server/services/reports/stockReportStyle.xml',
          name: 'Entradas2',
          rows: res.data.map(Object.values),
          cols: [
            {
              caption: 'Fecha',
              width: 10
            },
            {
              caption: 'EMEI',
              width: 15
            },
            {
              caption: 'Descripción',
              width: 800
            },
            {
              caption: 'EAN',
              width: 15
            }
          ]
        }
        ]
      
      const result = nodeExcel.execute(reportConfig)
      res.setHeader('Content-Type', 'application/vnd.openxmlformats')
      res.setHeader('Content-Disposition', 'attachment; filename=Report.xlsx')
      res.end(result, 'binary')
    }
  )
  const service = app.service(servicePath)
  // service.hooks(hooks)
}

