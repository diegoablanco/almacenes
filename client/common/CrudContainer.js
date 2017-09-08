import React, {Component} from 'react'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { feathersServices } from '../feathers'
import ConfirmModal from './ConfirmModal'
import GridContainer from './GridContainer'
import { entityDeleted } from '../actions/messageBar'

class CrudContainer extends Component {
    onEdit = (id) => {
        const {showEditModal} = this.props
        showEditModal(id)
    }

    handleCreated = (entity) => {
        const { hideModal, reloadGrid } = this.props
        hideModal()
        reloadGrid()
    }

    handleEdited = (editedItem) => {
        const { hideModal, itemEdited } = this.props
        hideModal()
        itemEdited(editedItem)
    }
    
    handleDeleted = () => {
        this.hideConfirmModal()
    }
    deleteDialogStateSelector = (state) => {
        const { uiStateSelector } = this.props
        return uiStateSelector(state).confirmDialog.show
    }
    render(){
        const {
            gridColumns, 
            service,
            uiStateSelector,
            serviceStateSelector,
            showModal,
            hideModal,
            crudActions,
            toolbar,
            confirmModalOptions,
            deleteEntity,
            id,
            showConfirmModal,
            hideConfirmModal,
            confirmDeleteItem
        } = this.props
        return(        
            <div>
                <GridContainer
                    columns={gridColumns} 
                    editHandler={this.onEdit}
                    deleteHandler={showConfirmModal}  
                    service={service}  
                    uiStateSelector={uiStateSelector}     
                    serviceStateSelector={serviceStateSelector}  
                    crudActions={crudActions}
                    toolbar={toolbar}   
                />
                <this.props.formModal 
                    showModal={showModal}
                    id={id} 
                    onCreated={this.handleCreated} 
                    onEdited={this.handleEdited} 
                    handleClose={hideModal} 
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
  const {showModal, closeModal, id} = ownProps.uiStateSelector(state)
  const {data} = ownProps.serviceStateSelector(state)
  const props = {
    data, 
    showModal,
    closeModal,
    id
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { service, crudPage, crudActions } = ownProps
    const dispatches = {
        ...bindActionCreators({
            reloadGrid: crudActions.reloadGrid, 
            hideModal: crudActions.hideModal, 
            showEditModal: crudActions.showModal,
            itemEdited: crudActions.itemEdited,
            showConfirmModal: crudActions.showConfirmModal,
            hideConfirmModal: crudActions.hideConfirmModal,
            confirmDeleteItem: crudActions.confirmDeleteItem
        }, dispatch),  
        deleteEntity: (id) => {
            dispatch(service.remove(id))
            .then(result => {
                dispatch(crudActions.entityDeleted())
                dispatch(crudActions.itemDeleted(result.value)) 
            })
        },
        get: (id) => dispatch(service.get(id))
        }
    return dispatches
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudContainer)