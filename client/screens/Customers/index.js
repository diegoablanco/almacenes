import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feathersServices } from '../../feathers';
import ToolbarContainer from './ToolbarContainer.js';
import MessageBar from '../../common/MessageBar/MessageBar'
import ConfirmModal from '../../common/ConfirmModal'
import CustomerList from './CustomerList'
import CustomerFormModal from './CustomerFormModal'
import { hideModal, showModal } from '../../actions/customers'
import { entityDeleted } from '../../actions/messageBar'

import CustomerForm, {formName} from './CustomerFormContainer'

class Screen extends Component{
  state = {
    confirmModalOptions:{
      show: false,
      onCancel: () => this.setState({ confirmModalOptions: {...this.state.confirmModalOptions, show: false }})
    }
  }

  componentDidMount(){
      this.props.getList()
  }

  onEdit = (id) => {
    const {showEditModal} = this.props
    showEditModal(id)
  }

  onDelete = (id) => {
    const { deleteEntity, getList} = this.props
    this.setState({ confirmModalOptions: { ...this.state.confirmModalOptions, 
      show: true, 
      onConfirm: () => deleteEntity(id, this.handleDeleted)
    }})
  }

  handleDeleted = () => {
      const { getList } = this.props
      this.hideConfirmModal()
      getList()    
  }

  hideConfirmModal = () => this.setState({ confirmModalOptions: { ...this.state.confirmModalOptions, show: false }})

  handleCreatedOrUpdated = (entity) => {
      const { closeModal, getList } = this.props
      closeModal()
      getList(entity)
  }
    
  render(){    
    const { queryResult, closeModal, showModal, id } = this.props
    return (
      <div>
        <MessageBar />
        <ToolbarContainer />
        <CustomerList 
          queryResult={queryResult} 
          editHandler={this.onEdit}
          deleteHandler={this.onDelete}
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

const loadCustomers = () => {
    const query = {
      $sort: { name: 1 },
      $limit: 10,
      $select: ['_id', 'name', 'email', 'phone'],
    };

    return feathersServices.customers.find({ query });
}

const mapStateToProps = (state, ownProps) => {
  const { customers: {queryResult, data } } = state
  const props = {
    queryResult,
    data, 
    ...state.ui.customers
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getList: () => {
    dispatch(loadCustomers())
  },
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