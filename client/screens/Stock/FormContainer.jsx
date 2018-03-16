import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import stockSchema from '../../../common/validation/stock.json'
import documentAttachmentSchema from '../../../common/validation/documentAttachment.json'
import stockBoxSchema from '../../../common/validation/stockBox.json'
import stockPalletSchema from '../../../common/validation/stockPallet.json'
import stockItemDetailSchema from '../../../common/validation/stockItemDetail.json'
import stockReleaseSchema from '../../../common/validation/stockRelease.json'
import stockIssueSchema from '../../../common/validation/stockIssue.json'
import addressSchema from '../../../common/validation/address.json'
import getValidator from '../../common/Validation'
import StockForm from './Form'


export const formName = 'Stock'
function getValidatorByMovementType(movementType) {
  if (movementType === 'issue') {
    return getValidator(stockIssueSchema, [
      addressSchema
    ])
  }
  if (movementType === 'release') {
    return getValidator(stockReleaseSchema)
  }
  return getValidator(stockSchema, [
    stockBoxSchema,
    stockPalletSchema,
    documentAttachmentSchema,
    stockItemDetailSchema
  ])
}

function validator(values, propsToValidate) {
  return getValidatorByMovementType(values.movementType)(values, propsToValidate)
}
const mapStateToProps = (state, ownProps) => {
  const {
    customerLookup,
    targetCustomerLookup,
    carrierLookup,
    warehouseLookup,
    billingCustomerLookup,
    stockMovementType,
    availableServices
  } = ownProps.selectors.getUiState(state)
  const getFormValues = formValueSelector(formName)
  const { bindActions: {
    searchTargetCustomer,
    clearTargetCustomer,
    searchCustomer,
    clearCustomer,
    searchBillingCustomer,
    clearBillingCustomer,
    searchCarrier,
    clearCarrier,
    searchWarehouse,
    clearWarehouse,
    fileUploadActions,
    setServiceRate
  } } = ownProps
  return {
    targetCustomerLookup,
    targetCustomerLookupActions: { search: searchTargetCustomer, clear: clearTargetCustomer },
    billingCustomerLookup,
    billingCustomerLookupActions: { search: searchBillingCustomer, clear: clearBillingCustomer },
    customerLookup,
    customerLookupActions: { search: searchCustomer, clear: clearCustomer },
    carrierLookup,
    carrierLookupActions: { search: searchCarrier, clear: clearCarrier },
    warehouseLookup,
    warehouseLookupActions: { search: searchWarehouse, clear: clearWarehouse },
    form: formName,
    // validate: getValidatorByMovementType(stockMovementType),
    validate: validator,
    availableInstructions: state.uneditables.queryResult.warehouseInstructions,
    availableStockItemDetailTypes: state.uneditables.queryResult.stockItemDetailTypes,
    availableServices,
    fileUploadActions,
    setServiceRate,
    ...getFormValues(state, 'customer', 'targetCustomer', 'billingCustomer', 'warehouse', 'carrier', 'instructions'),
    extras: {
      stockMovementType,
      stockMovementTypes: state.uneditables.queryResult.stockMovementTypes
    }
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm())(StockForm)
