export function createColumn({property, label, cellFormatters = []}) {
    return {
            property: property,
            header: {
                label: label
            },
            cell: { formatters: cellFormatters}
    }
}
export function createColumns(...columns) {
    return columns.map(column => createColumn(column))
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