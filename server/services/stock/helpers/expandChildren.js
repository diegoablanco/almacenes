const { flattenDeep } = require('lodash')

function reduceBy(selector) {
  return (result, item) => {
    const props = (selector(item) || [])
    const moreProps = props.map(x => reduceBy(selector)([], x))
    return flattenDeep([moreProps, props])
  }
}
module.exports = async function (context) {
  context.result.data = context.result.data.reduce((result, item) => {
    const ancestorsToAdd = reduceBy(x => x.ancestors || [])([], item).filter(x => !result.some(y => y.id === x.id))
    const childrenToAdd = reduceBy(x => x.children || [])([], item).filter(x => !result.some(y => y.id === x.id))
    return result.concat(ancestorsToAdd).concat(childrenToAdd)
  }, context.result.data)
}
