module.exports = function (hook) {
  hook.result.data.forEach(data => {
    if (data.boxes) {
      data.goods = `${data.boxes.quantity} cajas`
      delete data.boxes
    }
    if (data.palets) {
      data.goods = `${data.palets.quantity} palets`
      delete data.palets
    }
  })
}
