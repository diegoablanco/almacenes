module.exports = async function (context) {
  context.result.data = context.result.data.reduce((result, item) => result.concat([item, ...item.children]), [])
}
