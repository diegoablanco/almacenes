import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import getCrudPageActions from '../../actions/stocks'
import selectors from '../../selectors/stocks'

export default class StockCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'id', label: 'Código de Stock' },
      {
        property: 'status',
        label: 'Estado',
        cellFormatters: [({ description, color }) => (<Label color={color} horizontal>{description}</Label>)]
      },
      { property: 'warehouse.name', label: 'Almacén' },
      { property: 'customer.companyName', label: 'Cliente' },
      { property: 'targetCustomer.companyName', label: 'Cliente Destinatario' }
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
        />
      </div>
    )
  }
}
