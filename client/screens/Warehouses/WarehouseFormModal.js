import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormModal from '../../common/FormModal'
import WarehouseForm, {formName} from './WarehouseFormContainer'

export default class WarehouseFormModal extends Component{
    static propTypes = {
        showModal: PropTypes.bool.isRequired
    }
    render(){
        const {id, ...rest} = this.props
        return(
            <FormModal 
                title={id ? "Editar Almacén" : "Agregar Almacén"}
                form={WarehouseForm}
                formName={formName}
                id={id}
                {...rest}
                />)
    }
}