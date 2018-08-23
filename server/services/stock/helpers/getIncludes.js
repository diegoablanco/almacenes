module.exports = function (database) {
  const {
    models: {
      customer,
      warehouse,
      carrier,
      warehouseInstruction,
      stockBox,
      stockPallets,
      documentAttachment,
      fileAttachment,
      stockItemDetail,
      stockService,
      stockMovement,
      stockStatus,
      stockReference,
      stock
    }
  } = database
  const getIncludes = () => ({
    customer: {
      model: customer,
      attributes: ['companyName']
    },
    targetCustomer: {
      model: customer,
      as: 'targetCustomer',
      attributes: ['companyName']
    },
    billingCustomer: {
      model: customer,
      as: 'billingCustomer',
      attributes: ['companyName']
    },
    stockBox: {
      model: stockBox,
      as: 'boxes',
      include: [{ model: stockItemDetail, as: 'details' }]
    },
    stockPallets: {
      model: stockPallets,
      as: 'palets',
      include: [{ model: stockItemDetail, as: 'details' }]
    },
    warehouse: {
      model: warehouse,
      include: []
    },
    carrier: {
      model: carrier
    },
    status: {
      model: stockStatus,
      as: 'status'
    },
    warehouseInstruction: {
      model: warehouseInstruction,
      as: 'instructions',
      through: 'stock_instructions'
    },
    documents: {
      model: documentAttachment,
      as: 'documents',
      through: 'stock_documents'
    },
    images: {
      model: fileAttachment,
      as: 'images',
      through: 'stock_images'
    },
    services: {
      model: stockService,
      as: 'services'
    },
    movements: {
      model: stockMovement,
      as: 'movements'
    },
    references: {
      model: stockReference,
      as: 'references',
      through: 'stock_references'
    }
  })
  const { customer: ancestorCustomer, targetCustomer, status, warehouse: ancestorWarehouse } = getIncludes()
  const { customer: descendentCustomer, targetCustomer: descendentTargetCustomer, status: descendentStatus, warehouse: descendentWarehouse } = getIncludes()
  return {
    ...getIncludes(),
    stock: {
      model: stock,
      as: 'ancestors',
      include: [ancestorCustomer, targetCustomer, status, ancestorWarehouse]
    },
    descendantStock: {
      model: stock,
      as: 'descendents',
      include: [descendentCustomer, descendentTargetCustomer, descendentStatus, descendentWarehouse],
      hierarchy: true
    }
  }
}
