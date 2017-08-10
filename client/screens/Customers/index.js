import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feathersServices } from '../../feathers';
import ToolbarContainer from './ToolbarContainer.js';
import MessageBar from '../../common/MessageBar/MessageBar'
import CustomerList from './CustomerList'
import CustomerFormModal from './CustomerFormModal'
import { hideModal, showModal } from '../../actions/customers'

import CustomerForm, {formName} from './CustomerFormContainer'

class Screen extends Component{  
  componentDidMount(){
      this.props.getList()
  }
  onEdit = (id) => {
    const {showEditModal} = this.props
    showEditModal(id)
  }
  
  onCrudAction = (entity) => {
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
          />
        <CustomerFormModal 
          showModal={showModal}
          id={id} 
          onCreated={this.onCrudAction} 
          onUpdated={this.onCrudAction} 
          handleClose={closeModal} 
          />
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
  onDelete: (id) => {},
  get: (id) => dispatch(feathersServices.customers.get(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);