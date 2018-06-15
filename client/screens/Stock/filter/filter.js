import moment from 'moment'
import getCrudPageActions from '../../../actions/stocks'

function buildFilter({ reference, status, customerId, dateFrom, dateTo }) {
  return {
    reference: reference && {
      $like: `%${reference}%`
    },
    customerId,
    date: (dateFrom || dateTo) && {
      $gte: dateFrom && moment(dateFrom).startOf('day').toDate(),
      $lte: dateTo && moment(dateTo).endOf('day').toDate()
    },
    where: {
      status: status && status.map(x => x.id)
    },
    anyFilter: (reference || customerId) !== undefined || (status !== undefined && status.length > 0)
  }
}
export default function filter(values, dispatch) {
  const { filterGrid } = getCrudPageActions()
  dispatch(filterGrid(buildFilter(values)))
}
