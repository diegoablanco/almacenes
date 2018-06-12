import React, { Component } from 'react'
import FormModal from '../../common/FormModal'
import ProductCategoryForm from './ProductCategoryFormContainer'

export const formName = 'productCategory'
export default class WarehouserServiceFormModal extends Component {
  render() {
    const { id, selectors, handleClose, onCreatedOrUpdated, bindActions } = this.props
    return (
      <FormModal
        title={id ? 'Editar Categoría' : 'Agregar Categoría'}
        form={ProductCategoryForm}
        formName={formName}
        {...{ selectors, handleClose, onCreatedOrUpdated, id, bindActions }}
        size="small"
      />)
  }
}
