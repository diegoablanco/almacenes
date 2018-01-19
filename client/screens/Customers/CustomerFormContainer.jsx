import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import FormContainer from '../../common/FormContainer'
import CustomerForm from './CustomerForm'

import customerSchema from '../../../common/validation/customer.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'

export const formName = 'Customer'
class CustomerFormContainer extends Component {
  constructor(props) {
    super(props)
    this.defaultData = {}
    this.getCustomerValidator = () => getValidator(
      customerSchema,
      [accountSchema, addressSchema, contactSchema, phoneSchema]
    )
  }


  render() {
    const { id, phoneTypes, ...rest } = this.props

    return (<FormContainer
      {...rest}
      service={feathersServices.customers}
      id={id}
      form={CustomerForm}
      formName={formName}
      validate={this.getCustomerValidator()}
      defaultData={this.defaultData}
    />)
  }
}

const mapStateToProps = (state) => ({
  extras: { phoneTypes: state.uneditables.queryResult.phoneTypes || [] }
})
export default connect(mapStateToProps)(CustomerFormContainer)
