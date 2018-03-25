import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'

const initialState = {
  sortingColumns: {
    name: {
      direction: 'asc',
      position: 0
    }
  },
  warehouseService: {
    showModal: false
  },
  formName: 'warehouse'
}
export default getCrudReducer(crudPages.WAREHOUSES, initialState)
