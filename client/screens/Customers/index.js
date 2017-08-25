import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feathersServices } from '../../feathers';
import ToolbarContainer from './ToolbarContainer.js';
import MessageBar from '../../common/MessageBar/MessageBar'
import ConfirmModal from '../../common/ConfirmModal'
import CustomerList from './CustomerList'
import CustomerFormModal from './CustomerFormModal'
import { hideModal, showModal, setSortingColumns } from '../../actions/customers'
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
      this.find()
  }
  buildSortFromSortingColumns(sortingColumns){
    var sort = {}
    Object.keys(sortingColumns).forEach(
      column => sort[column] = sortingColumns[column].direction === "asc" ? 1 : -1
    )
    return sort
  }
  find = () => {
    const {filter, sortingColumns, find} = this.props
    const query = {
      $sort: this.buildSortFromSortingColumns(sortingColumns),
      $limit: 3,
      // $select: ['_id', 'name', 'email', 'phone'],
    };

    find(Object.assign(query, filter))
  }

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
      this.find()
  }

  hideConfirmModal = () => this.setState({ confirmModalOptions: { ...this.state.confirmModalOptions, show: false }})

  handleCreatedOrUpdated = (entity) => {
      const { closeModal } = this.props
      closeModal()
      this.find()
  }
  handleSort = (sortingColumns) => {
    const { setSortingColumns } = this.props
    setSortingColumns(sortingColumns)
    this.find()
  }
  render(){    
    const { queryResult, closeModal, showModal, id, sortingColumns, setSortingColumns } = this.props
    return (
      <div>
        <MessageBar />
        <CustomerList 
          queryResult={queryResult} 
          editHandler={this.onEdit}
          deleteHandler={this.onDelete}  
          handleFilter={this.find}
          handleSort={this.handleSort}
          sortingColumns={sortingColumns}        
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
  const { customers: {queryResult, data } } = state
  const props = {
    queryResult,
    data, 
    ...state.ui.customers
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  find: (query) => {
    dispatch(feathersServices.customers.find({query}))
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
  get: (id) => dispatch(feathersServices.customers.get(id)),
  setSortingColumns: sortingColumns => dispatch(setSortingColumns(sortingColumns))
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);