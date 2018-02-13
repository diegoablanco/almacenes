import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isPristine, isSubmitting } from 'redux-form'
import { Button, Icon } from 'semantic-ui-react'
import FormModal from '../../common/FormModal'
import Form, { formName } from './FormContainer'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.movementButton = this.movementButton.bind(this)
  }
  processMovement() {
    return false
  }
  movementButton() {
    const { pristine, submitting, stockMovementType: { code: stockMovement } } = this.props
    return () => (
      <Button onClick={this.processMovement} disabled={pristine || submitting} loading={submitting}>
        <Icon name="save" />
        {stockMovement === 'release' && 'Liberar'}
        {stockMovement === 'salida' && 'Salida'}
      </Button>)
  }
  render() {
    const { id, stockMovementType = {}, ...rest } = this.props
    let showSave = true
    let showCustomButton
    switch (stockMovementType.code) {
      case 'release':
      case 'salida':
        showSave = false
        showCustomButton = true
        break
      default:
        showSave = true
        showCustomButton = false
        break
    }
    return (
      <FormModal
        title={`Movimiento de Stock: ${stockMovementType.description}`}
        form={Form}
        formName={formName}
        id={id}
        showSave={showSave}
        showCustomButton={showCustomButton}
        CustomButton={this.movementButton()}
        {...rest}
      />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selectors: { getUiState } } = ownProps
  const { stockMovementType } = getUiState(state)
  return {
    stockMovementType,
    pristine: isPristine(formName)(state),
    submitting: isSubmitting(formName)(state)
  }
}

export default connect(mapStateToProps)(Modal)
