import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormModal from '../../common/FormModal'
import Form, { formName } from './FormContainer'

class Modal extends Component {
  render() {
    const { id, stockMovementType, ...rest } = this.props
    return (
      <FormModal
        title={`Movimiento de Stock: ${stockMovementType && stockMovementType.description}`}
        form={Form}
        formName={formName}
        id={id}
        {...rest}
      />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selectors: { getUiState } } = ownProps
  return {
    stockMovementType: getUiState(state).stockMovementType
  }
}

export default connect(mapStateToProps)(Modal)
