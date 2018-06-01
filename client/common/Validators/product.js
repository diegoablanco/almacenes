import schema from '../../../common/validation/product.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
