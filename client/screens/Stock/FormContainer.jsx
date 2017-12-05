import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import StockForm from './Form'

import stockSchema from '../../../common/validation/stock.json'
import customerSchema from '../../../common/validation/customer.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'


export const formName = 'Stock'
const validate = getValidator(stockSchema, [customerSchema, accountSchema, addressSchema, contactSchema, phoneSchema])

const mapStateToProps = (state, ownProps) => {
  const {
    customerLookup,
    targetCustomerLookup,
    carrierLookup,
    warehouseLookup,
    billingCustomerLookup
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
    clearWarehouse
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
    validate,
    availableInstructions: state.uneditables.queryResult.warehouseInstructions,
    ...getFormValues(state, 'customer', 'targetCustomer', 'billingCustomer', 'warehouse', 'carrier', 'instructions')
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(StockForm))
