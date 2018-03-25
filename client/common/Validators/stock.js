import stockSchema from '../../../common/validation/stock.json'
import documentAttachmentSchema from '../../../common/validation/documentAttachment.json'
import stockIssueSchema from '../../../common/validation/stockIssue.json'
import addressSchema from '../../../common/validation/address.json'
import stockBoxSchema from '../../../common/validation/stockBox.json'
import stockPalletSchema from '../../../common/validation/stockPallet.json'
import stockItemDetailSchema from '../../../common/validation/stockItemDetail.json'
import stockReleaseSchema from '../../../common/validation/stockRelease.json'
import stockServiceSchema from '../../../common/validation/stockService.json'
import getValidator from '../../common/Validation'

export default {
  issue: getValidator(stockIssueSchema, [
    addressSchema
  ]),
  release: getValidator(stockReleaseSchema),
  default: getValidator(stockSchema, [
    stockBoxSchema,
    stockPalletSchema,
    documentAttachmentSchema,
    stockItemDetailSchema,
    stockServiceSchema
  ])
}
