import React, {Component} from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux'

class ConfirmModal extends Component {
    render(){
        const { 
            show, 
            title, 
            message, 
            onCancel, 
            onConfirm
        } = this.props

        return(
            <Modal open={show} size="mini">
                <Modal.Header content={title} />
                <Modal.Content content={message} />
                <Modal.Actions>
                    <Button negative onClick={onCancel} content="No" />
                    <Button positive onClick={onConfirm} icon='checkmark' labelPosition='right' content="Sí" />
                </Modal.Actions>
            </Modal>
        )
    }
}
const mapStateToProps = (state, ownProps) => {  
  const showDialog = ownProps.showDialogStateSelector(state)
  return { show: showDialog }
}
export default connect(mapStateToProps)(ConfirmModal)