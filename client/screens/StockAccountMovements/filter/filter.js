import moment from 'moment'
import { getCrudPageActions } from '../../../actions/stockAccountMovements'

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
export default function filter(values, dispatch) {
  const { filterGrid } = getCrudPageActions()
  dispatch(filterGrid(buildFilter(values)))
}
