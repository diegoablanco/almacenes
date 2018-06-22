module.exports = async function ({ app, result, data: { stockAccountId, type, products } }) {
  const {
    models: {
      stockAccountProduct
    }
  } = app.get('database')
  const query = { stockAccountId }
  const stockAccountProducts = await stockAccountProduct.find(query)
  products.forEach(element => {
    
  });
}
