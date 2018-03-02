
module.exports = async function (hook) {
  const { result, params: { movementType } } = hook
  const { models: { warehouseService, stockMovementType, service: serviceModel } } = hook.app.get('database')
  const { id: movementTypeId } = await stockMovementType.find({ where: { code: movementType } })
  const movementServices = await warehouseService.findAll({
    where: { stockMovementTypeId: movementTypeId, warehouseId: result.warehouseId },
    include: [serviceModel] })
  const services = movementServices.map(({ id, serviceId, service: { rate } }) => ({ id, serviceId, rate }))
  result.services = [...(result.services || []), ...services]
}
