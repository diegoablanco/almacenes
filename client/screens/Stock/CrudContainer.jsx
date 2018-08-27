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
import ReferencesColumn from './components/ReferencesColumn'
import { dateCellFormatter } from '../../utils'
import { filter } from './filter'

class StockCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      {
        property: 'id',
        label: 'Código',
        props: {
          style: {
            width: 120
          }
        }
      },
      {
        property: 'updatedAt',
        label: 'Último Mov.',
        cellFormatters: [date => date && moment(date).format('L')]
      },
      {
        property: 'customer.companyName', label: 'Cliente',
        props: {
          style: {
            width: 100
          }
        }
      },
      { property: 'warehouse.name', label: 'Almacén' },
      { property: 'description', label: 'Descripción' },
      { property: 'references', label: 'Referencias', cellFormatters: [ReferencesColumn], sortable: false },
      { property: 'targetCustomer.companyName', label: 'Cliente Dest.' },
      {
        property: 'status',
        label: 'Estado',
        cellFormatters: [(status, { rowData }) => (status && <StatusColumn status={status} rowData={rowData} />)]
      }
    ]
    this.getActionButtons = this.getActionButtons.bind(this)
  }
  getActionButtons({ id, status = {} }) {
    const { showFormModal, hold } = this.props
    switch (status.code) {
      case 'preReceive':
        return (
          <Popup
            trigger={<Button
              icon="sign in"
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
            key="issue"
            trigger={<Button
              icon="sign out"
              color="blue"
              size="mini"
              onClick={() => showFormModal(id, 'issue')}
            />}
            content="Salida"
          />,
          <ConfirmableButton
            key="hold"
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
            <ToolbarForm onSubmit={filter} {...{ crudActions }} />
          </Grid.Column>
          <Grid.Column width={13}>
            <CrudContainer
              crudPage="stock"
              gridColumns={this.gridColumns}
              gridActionButtons={this.getActionButtons}
              selectors={selectors}
              formModal={FormModal}
              crudActions={crudActions}
              enableTreeTabular
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
