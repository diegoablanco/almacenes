import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
import moment from 'moment'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import getCrudPageActions from '../../actions/stocks'
import { stocks as selectors } from '../../selectors'
import StatusColumn from './components/StatusColumn'

class StockCrud extends Component {
  constructor(props) {
    super(props)
    const { showFormModal } = props
    this.gridColumns = [
      { property: 'id', label: 'Código de Stock' },
      {
        property: 'status',
        label: 'Estado',
        cellFormatters: [(status, { rowData }) => (<StatusColumn status={status} rowData={rowData} />)]
      },
      { property: 'date', label: 'Fecha', cellFormatters: [date => moment(date).calendar()] },
      { property: 'lastMovementDate', label: 'Último Movimiento', cellFormatters: [date => date && moment(date).fromNow()] },
      { property: 'reference', label: 'Referencia' },
      { property: 'customer.companyName', label: 'Cliente' },
      { property: 'goods', label: 'Mercancía' },
      { property: 'warehouse.name', label: 'Almacén', sortable: true },
      { property: 'targetCustomer.companyName', label: 'Cliente Destinatario' },
      { cellFormatters: [(a, { rowData: { id, status } }) => {
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
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    const crudActions = getCrudPageActions()
    return (
      <div>
        <CrudContainer
          gridColumns={this.gridColumns}
          confirmModalOptions={this.confirmModalOptions}
          selectors={selectors}
          formModal={FormModal}
          toolbar={ToolbarContainer}
          crudActions={crudActions}
          enableDelete={false}
          // enableActionColumn={false}
          enableTreeTabular
        />
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  const { showFormModal } = getCrudPageActions()

  return bindActionCreators({ showFormModal }, dispatch)
}
export default connect(null, mapDispatchToProps)(StockCrud)
