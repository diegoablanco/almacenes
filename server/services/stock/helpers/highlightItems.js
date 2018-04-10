module.exports = function (context) {
  const { data: { itemsToHighlight } } = context
  context.result.data.forEach(data => {
    data.highlight = itemsToHighlight.includes(data.id)
  })
}
