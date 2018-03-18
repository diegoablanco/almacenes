const { last } = require('lodash')

module.exports = function (hook) {
  hook.result.data.forEach(data => {
    const { movements } = data
    if (movements.length > 0) {
      data.lastMovementDate = last(movements).createdAt
    }
  })
}
