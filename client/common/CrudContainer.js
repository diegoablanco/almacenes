import React, {Component} from 'react'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { feathersServices } from '../feathers'
import ConfirmModal from './ConfirmModal'
import GridContainer from './GridContainer'

class CrudContainer extends Component {    
    deleteDialogStateSelector = (state) => {
        const { selectors } = this.props
        return selectors.getUiState(state).confirmDialog.show
    }
    render(){
        const {
            gridColumns, 
            selectors,
            itemCreated,
            itemEdited,
            showModal,
            showFormModal,
            hideModal,
            crudActions,
            toolbar,
            confirmModalOptions,
            id,
            showConfirmModal,
            hideConfirmModal,
            confirmDeleteItem,
            initializeForm
        } = this.props
        return(        
            <div>
                <GridContainer
                    columns={gridColumns} 
                    editHandler={showFormModal}
                    deleteHandler={showConfirmModal}  
                    selectors={selectors}     
                    crudActions={crudActions}
                    toolbar={toolbar}   
                />
                <this.props.formModal 
                    selectors={selectors}   
                    id={id} 
                    onCreated={itemCreated} 
                    onEdited={itemEdited} 
                    handleClose={hideModal} 
                    initializeForm={initializeForm}
                />
                <ConfirmModal 
                    {...confirmModalOptions}
                    showDialogStateSelector={this.deleteDialogStateSelector}
                    onCancel={hideConfirmModal}
                    onConfirm={confirmDeleteItem}     
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {  
  const {showModal, closeModal, id} = ownProps.selectors.getUiState(state)
  const {data} = ownProps.selectors.getServiceState(state)
  const props = {
    data, 
    showModal,
    closeModal,
    id
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { crudActions } = ownProps
    return bindActionCreators(crudActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudContainer)