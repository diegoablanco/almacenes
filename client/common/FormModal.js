import React, {Component} from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { submit, isPristine, isSubmitting, hasSubmitSucceeded } from 'redux-form'

class FormModal extends Component {   
    static defaultProps = {
        onCreated: () => {},
        onEdited: () => {}
    }

    render(){
        const { 
            showModal, 
            id, 
            pristine, 
            submitting, 
            handleClose, 
            handleSubmit, 
            title,
            formName,
            onCreated,
            onEdited,
            initializeForm,
            selectors
         } = this.props
        
        return(
                <Modal
                    open={showModal}
                    size='small'>
                    <Modal.Header content={title} />
                    <Modal.Content>
                        <this.props.form onCreated={onCreated} onUpdated={onEdited} initializeForm={initializeForm} selectors={selectors}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleClose}>
                            <Icon name='cancel' /> Cancelar
                        </Button>
                        <Button onClick={handleSubmit} disabled={pristine || submitting} loading={submitting}>
                            <Icon name='save' /> Guardar
                        </Button>
                    </Modal.Actions>
                </Modal>
        )
    }
}
const mapStateToProps = (state, ownProps) => {      
    const {formName, selectors} = ownProps
    return {    
        pristine: isPristine(formName)(state),
        submitting: isSubmitting(formName)(state),
        submitSucceeded: hasSubmitSucceeded(formName)(state),
        showModal: selectors.getUiState(state).showModal
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: () => dispatch(submit(ownProps.formName))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);