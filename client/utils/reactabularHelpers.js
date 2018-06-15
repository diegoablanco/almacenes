export function createColumn({ label, cellFormatters = [], ...rest }) {
  return {
    ...rest,
    header: {
      label
    },
    cell: { formatters: cellFormatters }
  }
}
export function createColumns(...columns) {
  return columns.map(column => ({ sortable: true, ...createColumn(column) }))
}

export function addHeaderTransforms(columns, headerTransforms) {
  return columns.map(column =>
    ({
      ...column,
      header: { ...column.header, transforms: headerTransforms } }))
}

export function buildSortFromSortingColumns(sortingColumns) {
  const sort = {}
  Object.keys(sortingColumns).forEach(column => { sort[column] = sortingColumns[column].direction === 'asc' ? 1 : -1 })
  return sort
}
