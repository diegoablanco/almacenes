module.exports = function (context) {
  const { data: { itemsToHighlight } } = context
  context.result.data.forEach(data => {
    data.highlight = !data.parentId || itemsToHighlight.includes(data.id)
  })
}
