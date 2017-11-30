import React, { Component } from 'react'
import FormModal from '../../common/FormModal'
import Form, { formName } from './FormContainer'

export default class Modal extends Component {
  render() {
    const { id, ...rest } = this.props
    return (
      <FormModal
            title="Movimiento de Stock"
            form={Form}
            formName={formName}
            id={id}
            {...rest}
          />)
  }
}
