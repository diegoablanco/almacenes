import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feathersServices } from '../../feathers';
import ToolbarContainer from './ToolbarContainer.js';
import MessageBar from '../../common/MessageBar/MessageBar'
import ConfirmModal from '../../common/ConfirmModal'
import GridContainer from './GridContainer'
import CustomerFormModal from './CustomerFormModal'
import { hideModal, showModal, reloadGrid, itemDeleted } from '../../actions/customers'
import { entityDeleted } from '../../actions/messageBar'


import CustomerForm, {formName} from './CustomerFormContainer'

class Screen extends Component{
  state = {
    confirmModalOptions:{
      show: false,
      onCancel: () => this.setState({ confirmModalOptions: {...this.state.confirmModalOptions, show: false }})
    }
  }
  columns = [['name', 'Nombre'], ['email', 'E-mail'], ['phone', 'Teléfono']]

  onEdit = (id) => {
    const {showEditModal} = this.props
    showEditModal(id)
  }

  onDelete = (id) => {
    const { deleteEntity } = this.props
    this.setState({ confirmModalOptions: { ...this.state.confirmModalOptions, 
      show: true, 
      onConfirm: () => deleteEntity(id, this.handleDeleted)
    }})
  }

  handleDeleted = () => {
      this.hideConfirmModal()
      this.props.reloadGrid()
  }

  hideConfirmModal = () => this.setState({ confirmModalOptions: { ...this.state.confirmModalOptions, show: false }})

  handleCreatedOrUpdated = (entity) => {
      const { closeModal } = this.props
      closeModal()
      this.props.reloadGrid()
  }

  customerGridStateSelector(state){
    const { customers: {queryResult}, ui: {customers: {sortingColumns, filter, reloadGrid }} } = state
    return {
      queryResult,
      sortingColumns,
      reloadGrid,
      filter
    }
  }

  render(){    
    const { 
      closeModal, 
      showModal, 
      id, 
      setSortingColumns } = this.props

    return (
      <div>
        <MessageBar />
        <GridContainer
          columns={this.columns} 
          editHandler={this.onEdit}
          deleteHandler={this.onDelete}  
          service={feathersServices.customers}  
          stateSelector={this.customerGridStateSelector}     
          />
        <CustomerFormModal 
          showModal={showModal}
          id={id} 
          onCreated={this.handleCreatedOrUpdated} 
          onUpdated={this.handleCreatedOrUpdated} 
          handleClose={closeModal} 
          />
        <ConfirmModal 
          {...this.state.confirmModalOptions}
          title="Eliminar Cliente"
          message="¿Confirma eliminar el cliente?"/>
      </div>
    )
  } 
}

const mapStateToProps = (state, ownProps) => {
  const { customers: { data }, ui: {customers: {showModal, closeModal, id}} } = state
  const props = {
    data, 
    showModal,
    closeModal,
    id
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  reloadGrid: () => dispatch(reloadGrid()),
  closeModal: () => dispatch(hideModal()),
  showEditModal: (id) => dispatch(showModal(id)),
  deleteEntity: (id, onComplete) => {
    dispatch(feathersServices.customers.remove(id))
    .then(() => {
      dispatch(entityDeleted())
      onComplete()      
    })
  },
  get: (id) => dispatch(feathersServices.customers.get(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);