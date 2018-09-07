const path = require('path')
const fs = require('fs')

const receivedStock = require('./receivedStock')
const issuedStock = require('./issuedStock')
const actualStock = require('./actualStock')
const stockCount = fs.readFileSync(path.resolve(__dirname, 'stockCount.sql')).toString()

module.exports = {
  receivedStock,
  issuedStock,
  actualStock,
  stockCount
}

