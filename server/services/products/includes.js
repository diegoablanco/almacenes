module.exports = function getIncludes(database) {
  const {
    models: {
      productType,
      productCategory
    }
  } = database
  return {
    productType: { model: productType, as: 'type', include: { model: productCategory, as: 'category' } }
  }
}
