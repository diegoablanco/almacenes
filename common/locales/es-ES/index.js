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
const filterStockAccountMovement = require('./filterStockAccountMovement')

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
  stockAccountMovement,
  filterStockAccountMovement,
  addReference: {
    quantity: stock.quantity,
    reference: 'Referencia',
    deleteDialog: {
      title: 'Eliminar Referencia',
      message: '¿Confirma eliminar la referencia?'
    }
  }
}
