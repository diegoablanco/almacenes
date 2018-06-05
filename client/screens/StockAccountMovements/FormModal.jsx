import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isPristine, isSubmitting, submit } from 'redux-form'
import { Button, Icon } from 'semantic-ui-react'
import FormModal from '../../common/FormModal'
import Form, { formName } from './FormContainer'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.movementButton = this.movementButton.bind(this)
  }
  movementButton() {
    const {
      pristine,
      submitting,
      handleSubmit,
      stockMovementType: { code: stockMovement } = {} } = this.props
    return () => (
      <Button onClick={handleSubmit} disabled={pristine || submitting} loading={submitting}>
        <Icon name="save" />
        {stockMovement === 'receive' && 'Ingresar'}
        {stockMovement === 'issue' && 'Salida'}
      </Button>)
  }
  render() {
    const { id,
      stockMovementType = {},
      ...rest } = this.props
    return (
      <FormModal
        title={`Movimiento de Stock: ${stockMovementType.description}`}
        form={Form}
        formName={formName}
        id={id}
        showSave={false}
        showCustomButton
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
const mapDispatchToProps = dispatch => bindActionCreators({
  handleSubmit: () => submit(formName)
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Modal)
