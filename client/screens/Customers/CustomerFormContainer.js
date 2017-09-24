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
    defaultData = {
        authorizedPersons: [{
            name: "das",
            phones: [{ number: "12345"}]
        }]
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
            defaultData={this.defaultData}
        />)
    }
}

const mapStateToProps = (state) => ({
    data: state.customers.data,
    ui: state.ui.customers
})
export default connect(mapStateToProps)(CustomerFormContainer)