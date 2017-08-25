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

export function addHeaderTransforms(columns, headerTransforms) {
    return columns.map(column => 
        { 
            return { 
                ...column, 
                header: { ...column.header, transforms: headerTransforms }} 
        })
}