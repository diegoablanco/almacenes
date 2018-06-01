import React, { Component } from 'react'
import FormModal from '../../common/FormModal'
import Form, { formName } from './FormContainer'

export default class CustomerFormModal extends Component {
  render() {
    const { id, ...rest } = this.props
    return (
      <FormModal
        title={id ? 'Editar Producto' : 'Agregar Producto'}
        form={Form}
        formName={formName}
        id={id}
        {...rest}
      />)
  }
}
