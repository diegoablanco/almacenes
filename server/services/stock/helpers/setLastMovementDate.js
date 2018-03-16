const { last } = require('lodash')

module.exports = function (hook) {
  hook.result.data.forEach(data => {
    const { movements } = data
    data.lastMovementDate = last(movements).createdAt
  })
}
