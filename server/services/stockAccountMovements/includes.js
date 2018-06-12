module.exports = function getIncludes(database) {
  const {
    models: {
      product,
      productType,
      productCategory
    }
  } = database
  return {
    products: {
      model: product,
      as: 'products',
      include: { model: productType, as: 'type', include: { model: productCategory, as: 'category' } }
    }
  }
}
