import React, {Component} from 'react'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import ServiceForm from './ServiceForm'
import getValidator from '../../common/Validation'
import schema from '../../../common/validation/service.json'

export const formName = "Service"
class ServiceFormContainer extends Component{
    validate(values){
        return makeValidator(schema)(values)
    }
    render(){
        const {id, ...rest} = this.props
        const validate = this.validate
        
        return(<FormContainer
            {...rest}
            service={feathersServices.services}
            id={id}
            form={ServiceForm}
            formName={formName} 
            validate={getValidator(schema)}  
        />)
    }
}

const mapStateToProps = (state) => ({
    data: state.services.data
});
export default ServiceFormContainer