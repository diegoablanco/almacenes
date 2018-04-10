const { isEmpty } = require('lodash')

module.exports = async function (context) {
  context.result.data = context.result.data.reduce((result, item) => {
    const ancestorsToAdd = item.ancestors.filter(x => !result.some(y => y.id === x.id))
    item.highlight = !isEmpty(context.params.search)
    return result.concat(ancestorsToAdd)
  }, context.result.data)
}
