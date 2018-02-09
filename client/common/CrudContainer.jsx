import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ConfirmModal from './ConfirmModal'
import GridContainer from './GridContainer'

class CrudContainer extends Component {
  constructor(props) {
    super(props)
    this.deleteDialogStateSelector = this.deleteDialogStateSelector.bind(this)
  }
  deleteDialogStateSelector(state) {
    const { selectors } = this.props
    return selectors.getUiState(state).confirmDialog.show
  }
  render() {
    const {
      gridColumns,
      selectors,
      crudActions,
      toolbar,
      confirmModalOptions,
      id,
      enableAdd,
      enableEdit,
      enableActionColumn,
      bindActions: {
        createOrUpdate,
        showConfirmModal,
        hideConfirmModal,
        confirmDeleteItem,
        showFormModal,
        hideModal,
        initializeForm
      }
    } = this.props
    return (
      <div>
        <GridContainer
          columns={gridColumns}
          editHandler={showFormModal}
          deleteHandler={showConfirmModal}
          selectors={selectors}
          crudActions={crudActions}
          toolbar={toolbar}
          enableAdd={enableAdd}
          enableEdit={enableEdit}
          addHandler={showFormModal}
          enableActionColumn={enableActionColumn}
        />
        <this.props.formModal
          selectors={selectors}
          id={id}
          onCreatedOrUpdated={createOrUpdate}
          handleClose={hideModal}
          initializeForm={initializeForm}
          bindActions={this.props.bindActions}
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
  const { showModal, closeModal, id } = ownProps.selectors.getUiState(state)
  const { data } = ownProps.selectors.getServiceState(state)
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
  return {
    bindActions: bindActionCreators(crudActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudContainer)
