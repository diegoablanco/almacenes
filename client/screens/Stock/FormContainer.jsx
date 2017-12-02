import { reduxForm, getFormValues } from 'redux-form'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StockForm from './Form'

import carrierSchema from '../../../common/validation/carrier.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'


export const formName = 'Stock'
const validator = getValidator(carrierSchema, [accountSchema, addressSchema, contactSchema, phoneSchema])
class StockFormContainer extends Component {
  render() {
    const { extras } = this.props

    return (<StockForm
      extras={extras}
    />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { customerLookup, targetCustomerLookup, carrierLookup } = ownProps.selectors.getUiState(state)
  const { bindActions: {
    onCreatedOrUpdated,
    searchTargetCustomer,
    clearTargetCustomer,
    searchCustomer,
    clearCustomer,
    searchCarrier,
    clearCarrier
  } } = ownProps
  return {
    extras: {
      targetCustomerLookup,
      targetCustomerLookupActions: { search: searchTargetCustomer, clear: clearTargetCustomer },
      customerLookup,
      customerLookupActions: { search: searchCustomer, clear: clearCustomer },
      carrierLookup,
      carrierLookupActions: { search: searchCarrier, clear: clearCarrier }
    },
    onCreatedOrUpdated
  }
}
export default reduxForm({
  form: formName
})(connect(mapStateToProps)(StockFormContainer))
