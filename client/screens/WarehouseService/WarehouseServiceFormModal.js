import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormModal from '../../common/FormModal'
import FormContainer from '../../common/FormContainer'
import WarehouserServiceForm from './WarehouseServiceForm'

export const formName = "WarehouseService"
export default class WarehouserServiceFormModal extends Component{
    formContainer = () =>{
        const {selectors, initializeForm, onCreatedOrUpdated} = this.props
        return (<FormContainer
            form={WarehouserServiceForm}
            //validate={this.getCustomerValidator()}  
            defaultData={{}}
             {...{selectors, formName, onCreatedOrUpdated, initializeForm}}
        />)
    }
    render(){
        const {id, selectors, handleClose, onCreatedOrUpdated} = this.props
        return(
            <FormModal 
                title={id ? "Editar Servicio del Almacén" : "Agregar Servicio del Almacén"}
                form={this.formContainer}
                formName={formName}
                {...{selectors, handleClose, onCreatedOrUpdated, id}}
                />)
    }
}