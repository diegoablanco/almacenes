import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Grid, Popup } from 'semantic-ui-react'
import moment from 'moment'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import ToolbarForm from './ToolbarForm'
import getCrudPageActions from '../../actions/stocks'
import { stocks as selectors } from '../../selectors'
import StatusColumn from './components/StatusColumn'
import { ConfirmableButton } from '../components'

class StockCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'id', label: 'Código' },
      { property: 'date', label: 'Fecha', cellFormatters: [date => moment(date).format('L')] },
      { property: 'updatedAt',
        label: 'Último Mov.',
        cellFormatters: [date => date && moment(date).format('L')]
      },
      { property: 'customer.companyName', label: 'Cliente' },
      { property: 'warehouse.name', label: 'Almacén' },
      { property: 'reference', label: 'Referencia' },
      { property: 'description', label: 'Descripción' },
      { property: 'goods', label: 'Mercancía' },
      { property: 'targetCustomer.companyName', label: 'Cliente Destinatario' },
      {
        property: 'status',
        label: 'Estado',
        cellFormatters: [(status, { rowData }) => (status && <StatusColumn status={status} rowData={rowData} />)]
      }
    ]
    this.filter = this.filter.bind(this)
    this.getActionButtons = this.getActionButtons.bind(this)
    this.buildFilter = this.buildFilter.bind(this)
  }
  shouldComponentUpdate() {
    return false
  }
  getActionButtons({ id, status = {} }) {
    const { showFormModal, hold } = this.props
    switch (status.code) {
      case 'preReceive':
        return (
          <Popup
            trigger={<Button
              icon="add"
              positive
              size="mini"
              onClick={() => showFormModal(id, 'receive')}
            />}
            content="Alta"
          />
        )
      case 'receive':
      case 'released':
        return (
          [<Popup
            trigger={<Button
              icon="share"
              color="blue"
              size="mini"
              onClick={() => showFormModal(id, 'issue')}
            />}
            content="Salida"
          />,
            <ConfirmableButton
              icon="lock icon"
              color="black"
              size="mini"
              onConfirm={() => hold(id)}
              content="Hold"
              confirmMessage="¿Pasar el stock a On Hold?"
            />
          ]

        )
      case 'onHold':
        return (
          <Popup
            trigger={<Button
              icon="unlock"
              color="purple"
              size="mini"
              onClick={() => showFormModal(id, 'release')}
            />}
            content="Liberar"
          />)
      default:
        return null
    }
  } // eslint-disable-line react/jsx-closing-tag-location
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
              crudPage="stock"
              gridColumns={this.gridColumns}
              gridActionButtons={this.getActionButtons}
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
  const { showFormModal, filterGrid, hold } = getCrudPageActions()

  return bindActionCreators({ showFormModal, filterGrid, hold }, dispatch)
}
export default connect(null, mapDispatchToProps)(StockCrud)
