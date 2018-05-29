import schema from '../../../common/validation/warehouseService.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
