import React, { Component } from 'react'
import FormModal from '../../common/FormModal'
import CustomerForm, { formName } from './CustomerFormContainer'

export default class CustomerFormModal extends Component {
  render() {
    const { id, ...rest } = this.props
    return (
      <FormModal
        title={id ? 'Editar Cliente' : 'Agregar Cliente'}
        form={CustomerForm}
        formName={formName}
        id={id}
        {...rest}
      />)
  }
}
