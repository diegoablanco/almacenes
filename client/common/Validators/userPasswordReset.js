import schema from '../../../common/validation/userPasswordReset.json'
import getValidator from '../../common/Validation'
import { passwordsMustMatch } from './customErrors'

export default {
  validator: getValidator(schema, undefined, passwordsMustMatch)
}
