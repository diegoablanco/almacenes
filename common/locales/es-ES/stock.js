const address = require('./address.json')

const common = {
  quantity: 'Cantidad',
  individualWeight: 'Peso Individual',
  totalWeight: 'Peso Total',
  details: 'Detalles Adicionales'
}
const details = {
  quantity: common.quantity,
  description: 'Descripción'
}
module.exports = {
  reference: 'Referencia',
  description: 'Descripción',
  quantity: 'Cantidad de Unidades',
  address,
  customerId: 'Cliente',
  carrierId: 'Transportista',
  warehouseId: 'Almacén',
  targetCustomerId: 'Cliente Destinatario',
  billingCustomerId: 'Cliente de Facturación',
  instructions: 'Instrucciones',
  customInstructions: 'Instrucciones Adicionales',
  details: common.details,
  onHold: 'On Hold',
  documents: { documentTypeId: 'Tipo de Documento' },
  boxes: {
    ...common,
    details
  },
  palets: {
    ...common,
    unitsPerPallet: 'Unidades por Palet',
    totalUnits: 'Cantidad Total',
    details
  },
  services: {
    rate: 'Tarifa del Servicio',
    serviceId: 'Servicio'
  },
  deleteDialog: {
    title: 'Eliminar Stock',
    message: '¿Confirma eliminar el stock?'
  }
}
