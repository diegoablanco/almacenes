module.exports = function (hook) {
  hook.data.products.forEach(product => {
    delete product.type
  })
}
