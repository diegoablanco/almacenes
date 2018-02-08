import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StockForm from './Form'
import stockSchema from '../../../common/validation/stock.json'
import documentAttachmentSchema from '../../../common/validation/documentAttachment.json'
import stockBoxSchema from '../../../common/validation/stockBox.json'
import stockPalletSchema from '../../../common/validation/stockPallet.json'
import stockItemDetailSchema from '../../../common/validation/stockItemDetail.json'
import getValidator from '../../common/Validation'


export const formName = 'Stock'
const validate = getValidator(stockSchema, [
  stockBoxSchema,
  stockPalletSchema,
  documentAttachmentSchema,
  stockItemDetailSchema
])

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
    validate: validate, // eslint-disable-line object-shorthand
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
