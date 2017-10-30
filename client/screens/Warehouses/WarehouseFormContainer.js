import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {feathersServices} from '../../feathers'
import FormContainer from '../../common/FormContainer'
import WarehouseForm from './WarehouseForm'
import getValidator from '../../common/Validation'
import schema from '../../../common/validation/warehouse.json'

export const formName = "Warehouse"
class WarehouseFormContainer extends Component{
    validate(values){
        return makeValidator(schema)(values)
    }
    render(){
        const {id, ...rest} = this.props
        const validate = this.validate
        
        return(<FormContainer
            {...rest}
            service={feathersServices.warehouses}
            id={id}
            form={WarehouseForm}
            formName={formName} 
            validate={getValidator(schema)}  
        />)
    }
}

const mapStateToProps = (state) => ({
    data: state.warehouses.data
});
export default WarehouseFormContainer