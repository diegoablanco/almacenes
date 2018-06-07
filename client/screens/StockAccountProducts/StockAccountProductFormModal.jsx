import React, { Component } from 'react'
import FormModal from '../../common/FormModal'
import WarehouseForm from './WarehouseServiceFormContainer'

export const formName = 'WarehouseService'
export default class WarehouserServiceFormModal extends Component {
  render() {
    const { id, selectors, handleClose, onCreatedOrUpdated, bindActions } = this.props
    return (
      <FormModal
        title={id ? 'Editar Servicio del Almacén' : 'Agregar Servicio del Almacén'}
        form={WarehouseForm}
        formName={formName}
        {...{ selectors, handleClose, onCreatedOrUpdated, id, bindActions }}
        size="small"
      />)
  }
}
