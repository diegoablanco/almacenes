import schema from '../../../common/validation/warehouse.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
