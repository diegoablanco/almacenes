import React, { Component } from 'react'
import { Grid, Popup, Button } from 'semantic-ui-react'
import intl from 'react-intl-universal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import ToolbarForm from './ToolbarForm'
import { stockAccountMovements } from '../../selectors'
import { getCrudPageActions } from '../../actions/stockAccountMovements'
import { dateCellFormatter } from '../../utils'
import { MovementTypeColumn } from '../components'
import { ProductsDetailColumn } from './components'

class StockAccountMovementsCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'type',
        label: 'Tipo',
        props: {
          style: {
            width: 40
          }
        },
        cellFormatters: [(type, { rowData }) => (type && <MovementTypeColumn type={type} rowData={rowData} />)]
      },
      { property: 'date', label: 'Fecha', cellFormatters: [dateCellFormatter] },
      { property: 'detail', label: 'Detalle', cellFormatters: [ProductsDetailColumn], sortable: false }
    ]
    this.getActionButtons = this.getActionButtons.bind(this)
  }
  shouldComponentUpdate() {
    return false
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
    return (
      <Grid className="filter-grid-container">
        <Grid.Row >
          <Grid.Column>
            <ToolbarContainer {...{ crudActions }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <ToolbarForm onSubmit={this.filter} {...{ crudActions }} />
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
              enableDelete={false}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  const { showFormModal } = getCrudPageActions()

  return bindActionCreators({ showFormModal }, dispatch)
}
export default connect(null, mapDispatchToProps)(StockAccountMovementsCrud)
