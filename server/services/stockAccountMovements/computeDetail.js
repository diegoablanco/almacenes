module.exports = function (hook) {
  hook.result.data.forEach(data => {
    const detail = data.products.reduce((resume, element) => {
      const { type: { id, description } } = element
      if (!resume[id]) {
        resume[id] = { description, qty: 0 };
      }
      resume[id].qty += 1
      return resume
    }, {})
    delete data.products
    data.detail = detail
  })
}
