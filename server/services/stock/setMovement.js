module.exports = function setMovement({ result, data: { movementTypeId } }) {
  result.createMovement({ stockMovementTypeId: movementTypeId })
}
