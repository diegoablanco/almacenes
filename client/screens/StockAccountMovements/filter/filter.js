import moment from 'moment'
import { getCrudPageActions } from '../../../actions/stockAccountMovements'

function processFilter(filterValues) {
  const { dateFrom, dateTo } = filterValues
  if (dateFrom) {
    filterValues.dateFrom = moment(dateFrom).startOf('day').toDate()
  }
  if (dateTo) {
    filterValues.dateTo = moment(dateTo).endOf('day').toDate()
  }
  return filterValues
}
function buildFilter({ receipt, type, dateFrom, dateTo }) {
  return {
    receipt: receipt && {
      $like: `%${receipt}%`
    },
    date: (dateFrom || dateTo) && {
      $gte: dateFrom && moment(dateFrom).startOf('day').toDate(),
      $lte: dateTo && moment(dateTo).endOf('day').toDate()
    },
    where: {
      stockMovementType: type && type.map(x => x.id)
    },
    anyFilter: (receipt) !== undefined || (type !== undefined && type.length > 0)
  }
}
export default function filter({ report = false, ...values }, dispatch) {
  const { filterGrid, generateReport } = getCrudPageActions()
  const filterValues = processFilter(values)
  if (report) {
    dispatch(generateReport('stock', filterValues))
  } else {
    dispatch(filterGrid(buildFilter(filterValues)))
  }
}
