const product = require('./product')

module.exports = {
  date: 'Fecha',
  receipt: 'Albarán',
  products: 'Productos',
  product,
  deleteDialog: {
    title: 'Eliminar Movimiento de Stock',
    message: '¿Confirma eliminar el movimiento de stock?'
  }
}
