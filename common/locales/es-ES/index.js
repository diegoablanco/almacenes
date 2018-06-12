const common = require('./common')
const customer = require('./customer')
const stock = require('./stock')
const warehouse = require('./warehouse')
const carrier = require('./carrier')
const service = require('./service')
const filterStock = require('./filterStock')
const warehouseService = require('./warehouseService')
const contact = require('./contact')
const product = require('./product')
const productCategory = require('./productCategory')
const stockAccountMovement = require('./stockAccountMovement')

module.exports = {
  common,
  customer,
  stock,
  warehouse,
  carrier,
  service,
  filterStock,
  warehouseService,
  contact,
  product,
  productCategory,
  addProduct: product,
  issueProduct: product,
  stockAccountMovement
}
