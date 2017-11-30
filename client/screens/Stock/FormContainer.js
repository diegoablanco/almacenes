import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import StockForm from './Form'

import carrierSchema from '../../../common/validation/carrier.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'

import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'

export const formName = "Stock"
class StockFormContainer extends Component{    
    getStockValidator = () => {
        return getValidator(carrierSchema, [accountSchema, addressSchema, contactSchema, phoneSchema])
    }
    render(){
        const {id, phoneTypes, ...rest} = this.props
        
        return(<FormContainer
            {...rest}
            id={id}
            form={StockForm}
            formName={formName} 
            validate={this.getStockValidator()}  
            defaultData={{}}
            
        />)
    }
}

const mapStateToProps = (state, ownProps) => {
    const { customersLookup } = ownProps.selectors.getUiState(state)
    const { bindActions: { findCustomers: search } } = ownProps
    return {
        extras: { 
            customersLookup: customersLookup,
            customersLookupActions: {search}
        }
    }
}
export default connect(mapStateToProps)(StockFormContainer)