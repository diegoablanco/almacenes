const { isEmpty } = require('lodash')

module.exports = function (context) {
  context.data.itemsToHighlight = []
  if (!isEmpty(context.params.query) || context.data.filtered) {
    context.data.itemsToHighlight = context.result.data.map(item => item.id)
  }
}
