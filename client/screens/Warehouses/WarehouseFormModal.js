import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormModal from '../../common/FormModal'
import WarehouseForm, {formName} from './WarehouseFormContainer'

export default class WarehouseFormModal extends Component{
    render(){
        const {id, ...rest} = this.props
        return(
            <FormModal 
                title={id ? "Editar Servicio de Almacén" : "Agregar Servicio de Almacén"}
                form={WarehouseForm}
                formName={formName}
                id={id}
                {...rest}
                />)
    }
}