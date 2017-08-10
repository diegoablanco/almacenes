import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import CustomerForm from './CustomerForm'
import Ajv from 'ajv'
import makeValidator from '../../utils/makeValidator'
import schema from '../../../common/validation/customer.json'

export const formName = "Customer"
class CustomerFormContainer extends Component{
    static propTypes = {
    }
    validate(values){
        return makeValidator(schema)(values)
    }
    render(){
        const {id, ...rest} = this.props
        const validate = this.validate
        
        return(<FormContainer
            {...rest}
            service={feathersServices.customers}
            id={id}
            form={CustomerForm}
            formName={formName} 
            validate={validate}  
        />)
    }
}

const mapStateToProps = (state) => ({
    data: state.customers.data
});
export default CustomerFormContainer