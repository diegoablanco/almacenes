module.exports = function getIncludes(database) {
  const {
    models: {
      productType
    }
  } = database
  return {
    productType: { model: productType, as: 'type' }
  }
}
