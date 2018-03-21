import schema from '../../../common/validation/service.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(schema)
}
