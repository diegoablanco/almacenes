import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Grid } from 'semantic-ui-react'
import moment from 'moment'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import ToolbarForm from './ToolbarForm'
import getCrudPageActions from '../../actions/stocks'
import { stocks as selectors } from '../../selectors'
import StatusColumn from './components/StatusColumn'

class StockCrud extends Component {
  constructor(props) {
    super(props)
    const { showFormModal } = props
    this.gridColumns = [
      { property: 'id', label: 'Código de Stock' },
      { property: 'date', label: 'Fecha', cellFormatters: [date => moment(date).format('L')] },
      { property: 'updatedAt',
        label: 'Último Movimiento',
        cellFormatters: [date => date && moment(date).format('L')]
      },
      { property: 'customer.companyName', label: 'Cliente' },
      { property: 'warehouse.name', label: 'Almacén' },
      { property: 'reference', label: 'Referencia' },
      { property: 'goods', label: 'Mercancía' },
      { property: 'targetCustomer.companyName', label: 'Cliente Destinatario' },
      {
        property: 'status',
        label: 'Estado',
        cellFormatters: [(status, { rowData }) => (status && <StatusColumn status={status} rowData={rowData} />)]
      },
      { cellFormatters: [(a, { rowData: { id, status = {} } }) => {
        switch (status.code) {
          case 'preReceive':
            return (
              <Button
                icon="add"
                content="alta"
                positive
                onClick={() => showFormModal(id, 'receive')}
              />)
          case 'receive':
          case 'released':
            return (
              <Button
                icon="share"
                content="salida"
                color="black"
                onClick={() => showFormModal(id, 'issue')}
              />)
          case 'onHold':
            return (
              <Button
                icon="unlock"
                color="purple"
                onClick={() => showFormModal(id, 'release')}
                content="release"
              />)
          default:
            return null
        }
      }] // eslint-disable-line react/jsx-closing-tag-location
      }
    ]
    this.confirmModalOptions = {
      title: 'Eliminar Transportista',
      message: '¿Confirma eliminar el transportista?'
    }
    this.filter = this.filter.bind(this)
    this.buildFilter = this.buildFilter.bind(this)
  }
  shouldComponentUpdate() {
    return false
  }

  buildFilter({ reference, status, customerId, dateFrom, dateTo }) {
    return {
      reference: reference && {
        $like: `%${reference}%`
      },
      customerId,
      date: (dateFrom || dateTo) && {
        $gte: dateFrom && moment(dateFrom).startOf('day').toDate(),
        $lte: dateTo && moment(dateTo).endOf('day').toDate()
      },
      where: {
        status: status && status.map(x => x.id)
      },
      anyFilter: (reference || customerId) !== undefined || (status !== undefined && status.length > 0)
    }
  }
  filter(values) {
    const { filterGrid } = this.props
    filterGrid(this.buildFilter(values))
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
              gridColumns={this.gridColumns}
              confirmModalOptions={this.confirmModalOptions}
              selectors={selectors}
              formModal={FormModal}
              crudActions={crudActions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  const { showFormModal, filterGrid } = getCrudPageActions()

  return bindActionCreators({ showFormModal, filterGrid }, dispatch)
}
export default connect(null, mapDispatchToProps)(StockCrud)
