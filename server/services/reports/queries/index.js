const path = require('path')
const fs = require('fs')

const actualStock = fs.readFileSync(path.resolve(__dirname, 'actualStock.sql')).toString()
const issuedStock = fs.readFileSync(path.resolve(__dirname, 'issuedStock.sql')).toString()
const receivedStock = fs.readFileSync(path.resolve(__dirname, 'receivedStock.sql')).toString()
const stockCount = fs.readFileSync(path.resolve(__dirname, 'stockCount.sql')).toString()

module.exports = {
  receivedStock,
  issuedStock,
  actualStock,
  stockCount
}

