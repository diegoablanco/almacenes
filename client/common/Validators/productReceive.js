import schema from '../../../common/validation/productReceive.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
