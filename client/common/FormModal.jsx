import React, { Component } from 'react'
import { Button, Modal, Icon, Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { submit, isPristine, isSubmitting, hasSubmitSucceeded } from 'redux-form'

class FormModal extends Component {
  render() {
    const {
      showModal,
      id,
      pristine,
      submitting,
      handleClose,
      handleSubmit,
      title,
      onCreatedOrUpdated,
      initializeForm,
      selectors,
      bindActions,
      dimmed
    } = this.props

    return (
      <Modal open={showModal}>
        <Modal.Header content={title} />
        <Modal.Content scrolling size="big" style={{ minHeight: '500px' }}>
          <Dimmer.Dimmable dimmed={dimmed}>
            <Dimmer active={dimmed} inverted />
            <this.props.form {...{
              id,
              onCreatedOrUpdated,
              initializeForm,
              selectors,
              bindActions }}
            />
          </Dimmer.Dimmable>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>
            <Icon name="cancel" /> Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={pristine || submitting} loading={submitting}>
            <Icon name="save" /> Guardar
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const { formName, selectors } = ownProps
  const { dimmed, showModal } = selectors.getUiState(state)
  return {
    pristine: isPristine(formName)(state),
    submitting: isSubmitting(formName)(state),
    submitSucceeded: hasSubmitSucceeded(formName)(state),
    showModal,
    dimmed
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: () => dispatch(submit(ownProps.formName))
})
FormModal.defaultProps = {
  dimmed: false,
  onCreated: () => {},
  onEdited: () => {}
}
export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
