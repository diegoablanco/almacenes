import schema from '../../../common/validation/signIn.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
