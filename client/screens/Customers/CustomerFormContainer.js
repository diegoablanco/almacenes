import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import CustomerForm from './CustomerForm'
import getCustomerSchema from '../../../common/validation/customer'
import validate from 'redux-form-with-ajv'

export const formName = "Customer"
class CustomerFormContainer extends Component{
    static propTypes = {
    }
    
    defaultData = {
        authorizedPersons: [{
            name: "das",
            phones: [{ number: "12345"}]
        }]
    }
    render(){
        const {id, ...rest} = this.props
        
        return(<FormContainer
            {...rest}
            service={feathersServices.customers}
            id={id}
            form={CustomerForm}
            formName={formName} 
            validate={validate(getCustomerSchema())}  
            defaultData={this.defaultData}
        />)
    }
}

const mapStateToProps = (state) => ({
    data: state.customers.data,
    ui: state.ui.customers
})
export default connect(mapStateToProps)(CustomerFormContainer)