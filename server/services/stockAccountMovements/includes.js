module.exports = function getIncludes(database) {
  const {
    models: {
      product,
      productType
    }
  } = database
  return {
    products: {
      model: product,
      as: 'products',
      include: { model: productType, as: 'type' }
    }
  }
}
