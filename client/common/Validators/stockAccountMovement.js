import getValidator from '../../common/Validation'
import stockAccountIssue from '../../../common/validation/stockAccountIssue.json'
import stockAccountReceive from '../../../common/validation/stockAccountReceive.json'

export default {
  issue: getValidator(stockAccountIssue),
  receive: getValidator(stockAccountReceive)
}
