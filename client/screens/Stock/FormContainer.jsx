import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { stock } from '../../common/Validators'
import StockForm from './Form'


export const formName = 'stock'
function getValidatorByMovementType(movementType) {
  if (movementType === 'issue') {
    return stock.issue
  }
  if (movementType === 'release') {
    return stock.release
  }
  return stock.default
}

function validator(values, propsToValidate) {
  return getValidatorByMovementType(values.movementType)(values, propsToValidate)
}
const mapStateToProps = (state, ownProps) => {
  const {
    id,
    customerLookup,
    targetCustomerLookup,
    carrierLookup,
    warehouseLookup,
    billingCustomerLookup,
    stockMovementType,
    availableServices,
    showModalLoadingIndicator
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
    id,
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
    },
    loading: showModalLoadingIndicator
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
