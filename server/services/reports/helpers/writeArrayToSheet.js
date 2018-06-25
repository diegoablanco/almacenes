const xlsx = require('xlsx')

module.exports = function writeArrayToSheet({ sheet, array, startingAddress = { cell: 0, row: 0 } }) {
  if (array.length === 0) return
  const cells = Object.keys(array[0]).map(key => {
    const value = array[0][key]
    const cell = { type: undefined, key }
    /* assign type */
    if (typeof value === 'string') cell.type = 's'
    else if (typeof value === 'number') cell.type = 'n'
    else if (value === true || value === false) cell.type = 'b'
    else if (value instanceof Date) cell.type = 'd'
    else throw new Error('Unrecognized cell type')
    return cell
  })
  let { cell: c, row: r } = startingAddress

  array.forEach(o => {
    c = startingAddress.cell
    cells.forEach(({ key, type }) => {
      const address = xlsx.utils.encode_cell({ c, r })
      sheet[address] = { t: type, v: o[key] }
      c += 1
    })
    r += 1
  })

  /* find the cell range */
  const range = xlsx.utils.decode_range(sheet['!ref'] || 'A1:A1')

  /* extend the range to include the new cell */
  if (range.s.c > c) range.s.c = c
  if (range.s.r > r) range.s.r = r
  if (range.e.c < c) range.e.c = c
  if (range.e.r < r) range.e.r = r

  /* update range */
  sheet['!ref'] = xlsx.utils.encode_range(range);
}
