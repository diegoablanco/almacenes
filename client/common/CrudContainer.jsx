import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridContainer from './GridContainer'

class CrudContainer extends Component {
  constructor(props) {
    super(props)
    this.deleteDialogStateSelector = this.deleteDialogStateSelector.bind(this)
  }
  componentWillMount() {
    const {
      bindActions: {
        initializeCrud
      }
    } = this.props
    initializeCrud()
  }
  deleteDialogStateSelector(state) {
    const { selectors } = this.props
    return selectors.getUiState(state).confirmDialog.show
  }
  render() {
    const {
      gridColumns,
      selectors,
      crudPage,
      crudActions,
      gridActionButtons,
      toolbar,
      id,
      enableAdd,
      enableEdit,
      enableDelete,
      enableActionColumn,
      enableTreeTabular,
      bindActions: {
        createOrUpdate,
        remove,
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
          removeHandler={remove}
          {...{
            selectors,
            crudActions,
            toolbar,
            enableAdd,
            enableEdit,
            enableDelete,
            enableActionColumn,
            gridActionButtons,
            enableTreeTabular,
            crudPage }}
          addHandler={showFormModal}
        />
        <this.props.formModal
          selectors={selectors}
          id={id}
          onCreatedOrUpdated={createOrUpdate}
          handleClose={hideModal}
          initializeForm={initializeForm}
          bindActions={this.props.bindActions}
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
