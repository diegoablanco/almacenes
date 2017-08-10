export function createColumn(property, label) {
    return {
            property: property,
            header: {
                label: label
            }
    }
}
export function createColumns(...columns) {
    return columns.map(column => createColumn(...column))
}