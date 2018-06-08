module.exports = function getIncludes(database) {
  const {
    models: {
      product
    }
  } = database
  return {
    products: {
      model: product,
      as: 'products'
    }
  }
}
