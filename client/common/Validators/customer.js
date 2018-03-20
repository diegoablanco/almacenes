
import customerSchema from '../../../common/validation/customer.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import documentAttachmentSchema from '../../../common/validation/documentAttachment.json'
import getValidator from '../../common/Validation'

export default {
  validator: getValidator(
    customerSchema,
    [accountSchema, addressSchema, contactSchema, phoneSchema, documentAttachmentSchema]
  )
}

