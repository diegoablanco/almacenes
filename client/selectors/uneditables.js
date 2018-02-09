export default function ({
  uneditables:
    { queryResult:
        {
          phoneTypes,
          stockMovementTypes,
          warehouseInstructions,
          documentTypes,
          stockItemDetailTypes,
          stockStatuses
        }
    }
}) {
  return {
    phoneTypes,
    stockMovementTypes,
    warehouseInstructions,
    documentTypes,
    stockItemDetailTypes,
    stockStatuses
  }
}
