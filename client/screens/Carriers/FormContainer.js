import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import CarrierForm from './Form'

import carrierSchema from '../../../common/validation/carrier.json'
import accountSchema from '../../../common/validation/account.json'
import contactSchema from '../../../common/validation/contact.json'
import addressSchema from '../../../common/validation/address.json'
import phoneSchema from '../../../common/validation/phone.json'
import getValidator from '../../common/Validation'

import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'

export const formName = "Carrier"
class CarrierFormContainer extends Component{    
    getCarrierValidator = () => {
        return getValidator(carrierSchema, [accountSchema, addressSchema, contactSchema, phoneSchema])
    }
    render(){
        const {id, phoneTypes, ...rest} = this.props
        
        return(<FormContainer
            {...rest}
            service={feathersServices.carriers}
            id={id}
            form={CarrierForm}
            formName={formName} 
            validate={this.getCarrierValidator()}  
            defaultData={{}}
            
        />)
    }
}

const mapStateToProps = (state) => ({
    extras: {phoneTypes: state.uneditables.queryResult.phoneTypes || []}
})
export default connect(mapStateToProps)(CarrierFormContainer)