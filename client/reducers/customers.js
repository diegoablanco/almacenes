import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'

const initialState = {
  sortingColumns: {
    companyName: {
      direction: 'asc',
      position: 0
    }
  },
  formName: 'customer'
}
export default getCrudReducer(crudPages.CUSTOMERS, initialState)
