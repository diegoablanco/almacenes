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
    
export function buildSortFromSortingColumns(sortingColumns){
    var sort = {}
    Object.keys(sortingColumns).forEach(
        column => sort[column] = sortingColumns[column].direction === "asc" ? 1 : -1
    )
    return sort
}