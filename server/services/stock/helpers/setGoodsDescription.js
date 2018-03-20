module.exports = function (hook) {
  hook.result.data.forEach(data => {
    data.goods = `${data.quantity} Unidades`
  })
}
