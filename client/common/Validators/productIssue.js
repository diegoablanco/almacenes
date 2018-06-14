import schema from '../../../common/validation/productIssue.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
