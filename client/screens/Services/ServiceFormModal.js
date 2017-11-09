import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormModal from '../../common/FormModal'
import ServiceForm, {formName} from './ServiceFormContainer'

export default class ServiceFormModal extends Component{
    render(){
        const {id, ...rest} = this.props
        return(
            <FormModal 
                title={id ? "Editar Servicio" : "Agregar Servicio"}
                form={ServiceForm}
                formName={formName}
                id={id}
                {...rest}
                />)
    }
}