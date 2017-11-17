import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import CustomerForm from './CustomerForm'

import customerSchema from '../../../common/validation/customer.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'

import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'

export const formName = "Customer"
class CustomerFormContainer extends Component{
    static propTypes = {
    }
    
    defaultData = {
        
    }
    
    getCustomerValidator = () => {
        return getValidator(customerSchema, [accountSchema, addressSchema, contactSchema, phoneSchema])
    }
    render(){
        const {id, ...rest} = this.props
        
        return(<FormContainer
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
    data: state.customers.data,
    ui: state.ui.customers,
    extras: {phoneTypes: state.phoneTypes.queryResult}
})
export default connect(mapStateToProps)(CustomerFormContainer)