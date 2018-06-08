import getValidator from '../../common/Validation'
import schema from '../../../common/validation/stockAccountMovement.json'
import productSchema from '../../../common/validation/product.json'

export default {
  validator: getValidator(schema, [productSchema])
}
