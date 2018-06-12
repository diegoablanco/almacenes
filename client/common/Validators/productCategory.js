import schema from '../../../common/validation/productCategory.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
