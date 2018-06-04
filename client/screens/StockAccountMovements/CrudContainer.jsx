import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import ToolbarForm from './ToolbarForm'
import { stockAccountMovements } from '../../selectors'
import { getCrudPageActions } from '../../actions/stockAccountMovements'
import { dateCellFormatter } from '../../utils'

export default class StockAccountMovementsCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'id', label: 'Código' },
      { property: 'date', label: 'Fecha', cellFormatters: [dateCellFormatter] },
      { property: 'type', label: 'Tipo' }
    ]
  }
  shouldComponentUpdate() {
    return false
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
              selectors={stockAccountMovements}
              formModal={FormModal}
              crudActions={crudActions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
