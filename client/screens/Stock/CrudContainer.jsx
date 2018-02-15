import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import getCrudPageActions from '../../actions/stocks'
import selectors from '../../selectors/stocks'
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
      { property: 'reference', label: 'Referencia' },
      { property: 'goods', label: 'Mercadería' },
      { property: 'warehouse.name', label: 'Almacén', sortable: true },
      { property: 'customer.companyName', label: 'Cliente' },
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
                onClick={() => showFormModal(id, 'salida')}
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
          // enableActionColumn={false}
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
