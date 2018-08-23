import schema from '../../../common/validation/stockReference.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
