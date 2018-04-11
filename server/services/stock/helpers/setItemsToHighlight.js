module.exports = function (context) {
  context.data.itemsToHighlight = []
  if (context.data.filtered) {
    context.data.itemsToHighlight = context.result.data.map(item => item.id)
  }
}
