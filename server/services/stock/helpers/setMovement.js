module.exports = function setMovement(hook) {
  const { result, data: { movementTypeId }, params: { user } } = hook
  result.createMovement({ stockMovementTypeId: movementTypeId, createdById: user.id })
}
