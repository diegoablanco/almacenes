import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import FormContainer from '../../common/FormContainer'
import CustomerForm from './CustomerForm'
import { customer } from '../../common/Validators'

export const formName = 'Customer'
class CustomerFormContainer extends Component {
  constructor(props) {
    super(props)
    this.defaultData = {}
  }


  render() {
    const { id, phoneTypes, ...rest } = this.props

    return (<FormContainer
      {...rest}
      service={feathersServices.customers}
      id={id}
      form={CustomerForm}
      formName={formName}
      validate={customer.validator}
      defaultData={this.defaultData}
    />)
  }
}

const mapStateToProps = (state) => ({
  extras: { phoneTypes: state.uneditables.queryResult.phoneTypes || [] }
})
export default connect(mapStateToProps)(CustomerFormContainer)
