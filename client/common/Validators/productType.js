import schema from '../../../common/validation/productType.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
