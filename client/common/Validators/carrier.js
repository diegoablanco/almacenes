import carrierSchema from '../../../common/validation/carrier.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(carrierSchema, [accountSchema, addressSchema, contactSchema, phoneSchema])
}
