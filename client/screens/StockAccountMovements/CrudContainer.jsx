import React, { Component } from 'react'
import { Grid, Popup, Button } from 'semantic-ui-react'
import intl from 'react-intl-universal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import ToolbarForm from './ToolbarForm'
import ReportFormModal from './ReportFormModal'
import { stockAccountMovements } from '../../selectors'
import { getCrudPageActions } from '../../actions/stockAccountMovements'
import { dateCellFormatter } from '../../utils'
import { MovementTypeColumn } from '../components'
import { ProductsDetailColumn } from './components'
import { filter } from './filter'

class StockAccountMovementsCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'stockMovementTypeId',
        label: 'Tipo',
        props: {
          style: {
            width: 40
          }
        },
        cellFormatters: [(value, rowData) => <MovementTypeColumn {...{ value, ...rowData }} />]
      },
      { property: 'date', label: 'Fecha', cellFormatters: [dateCellFormatter] },
      { property: 'receipt', label: 'Albarán' },
      { property: 'detail', label: 'Detalle', cellFormatters: [ProductsDetailColumn], sortable: false }
    ]
    this.getActionButtons = this.getActionButtons.bind(this)
  }
  getActionButtons({ id, type }) {
    const { showFormModal } = this.props
    return (
      <Popup
        trigger={<Button
          icon="write"
          size="mini"
          onClick={() => showFormModal(id, type)}
        />}
        content={intl.get('common.edit')}
      />
    )
  }
  render() {
    const crudActions = getCrudPageActions()
    const { showReportModal, hideReportModal, generateReport } = this.props
    return (
      <Grid className="filter-grid-container">
        <Grid.Row >
          <Grid.Column>
            <ToolbarContainer {...{ crudActions }} />
            <ReportFormModal {...{ showReportModal, hideReportModal, generateReport }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <ToolbarForm onSubmit={filter} {...{ crudActions }} />
          </Grid.Column>
          <Grid.Column width={13}>
            <CrudContainer
              crudPage="stockAccountMovement"
              gridColumns={this.gridColumns}
              gridActionButtons={this.getActionButtons}
              selectors={stockAccountMovements}
              formModal={FormModal}
              crudActions={crudActions}
              enableEdit={false}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
const mapStateToProps = state => {
  const { showReportModal } = stockAccountMovements.getUiState(state)
  return {
    showReportModal
  }
}

const mapDispatchToProps = (dispatch) => {
  const { showFormModal, hideReportModal, generateReport } = getCrudPageActions()

  return bindActionCreators({ showFormModal, hideReportModal, generateReport }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(StockAccountMovementsCrud)
