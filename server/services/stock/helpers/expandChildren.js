module.exports = async function (context) {
  context.result.data = context.result.data.reduce((result, item) => {
    const ancestorsToAdd = (item.ancestors || []).filter(x => !result.some(y => y.id === x.id))
    const childrenToAdd = (item.children || []).filter(x => !result.some(y => y.id === x.id))
    return result.concat(ancestorsToAdd).concat(childrenToAdd)
  }, context.result.data)
}
