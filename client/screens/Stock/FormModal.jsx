import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormModal from '../../common/FormModal'
import Form, { formName } from './FormContainer'

class Modal extends Component {
  render() {
    const { id, stockMovementType, stockMovementTypes, ...rest } = this.props
    const stockMovementTypeDescription = stockMovementTypes.find(x => x.code === stockMovementType).description
    return (
      <FormModal
        title={`Movimiento de Stock: ${stockMovementTypeDescription}`}
        form={Form}
        formName={formName}
        id={id}
        {...rest}
      />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selectors: { getUiState } } = ownProps
  const { uneditables: { queryResult: { stockMovementTypes } } } = state
  return {
    stockMovementType: getUiState(state).stockMovementType || 'edit',
    stockMovementTypes
  }
}

export default connect(mapStateToProps)(Modal)
