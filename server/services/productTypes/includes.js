module.exports = function getIncludes(database) {
  const {
    models: {
      productCategory
    }
  } = database
  return {
    category: { model: productCategory, as: 'category' }
  }
}
