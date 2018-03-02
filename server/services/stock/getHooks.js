const { getIncludes } = require('./helpers')

module.exports = {
  getFullStock(hook) {
    const {
      customer,
      targetCustomer,
      billingCustomer,
      warehouse,
      carrier,
      warehouseInstruction,
      stockBox,
      stockPallets,
      documents,
      images,
      services,
      movements,
      status } = getIncludes(hook.app.get('database'))
    const stockDetailIncludeSettings = {
      attributes: ['id', 'description', 'quantity', 'stockItemDetailTypeId'],
      through: { attributes: [] }
    }
    stockBox.include[0] = {
      ...stockBox.include[0],
      stockDetailIncludeSettings }
    stockPallets.include[0] = {
      ...stockPallets.include[0],
      stockDetailIncludeSettings }
    hook.params.sequelize = {
      raw: false,
      include: [
        { ...customer, attributes: ['id', 'companyName'] },
        { ...targetCustomer, attributes: ['id', 'companyName'] },
        { ...billingCustomer, attributes: ['id', 'companyName'] },
        { ...carrier, attributes: ['id', 'companyName'] },
        { ...warehouse, attributes: ['id', 'name'] },
        { ...warehouseInstruction, attributes: ['id'], through: { attributes: [] } },
        stockBox,
        stockPallets,
        documents,
        images,
        services,
        movements,
        status
      ]
    }
  },
  getStockForRelease(hook) {
    const {
      customer,
      targetCustomer,
      warehouse,
      carrier,
      stockBox,
      stockPallets,
      documents,
      images,
      services,
      status } = getIncludes(hook.app.get('database'))
    const stockDetailIncludeSettings = {
      attributes: ['id', 'description', 'quantity', 'stockItemDetailTypeId'],
      through: { attributes: [] }
    }
    stockBox.include[0] = {
      ...stockBox.include[0],
      stockDetailIncludeSettings }
    stockPallets.include[0] = {
      ...stockPallets.include[0],
      stockDetailIncludeSettings }
    hook.params.sequelize = {
      raw: false,
      attributes: ['id', 'targetCustomerId'],
      include: [
        { ...customer, attributes: ['id', 'companyName'] },
        { ...targetCustomer, attributes: ['id', 'companyName'] },
        { ...carrier, attributes: ['id', 'companyName'] },
        { ...warehouse, attributes: ['id', 'name'] },
        stockBox,
        stockPallets,
        documents,
        images,
        services,
        status
      ]
    }
  }
}
