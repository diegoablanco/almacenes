import React, { Component } from 'react'
import { feathersServices } from '../../feathers'
import WarehouseFormModal from './WarehouseFormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import crudPages from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/warehouses'

export default class WarehouseCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'name', label: 'Nombre' },
      { property: 'email', label: 'E-mail' },
      { property: 'phone', label: 'Teléfono' }
    ]
    this.confirmModalOptions = {
      title: 'Eliminar Almacén',
      message: '¿Confirma eliminar el almacén?'
    }
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    const crudActions = getCrudPageActions(crudPages.WAREHOUSES, feathersServices.warehouses, selectors)
    return (
      <div>
        <CrudContainer
          gridColumns={this.gridColumns}
          confirmModalOptions={this.confirmModalOptions}
          selectors={selectors}
          formModal={WarehouseFormModal}
          toolbar={ToolbarContainer}
          crudActions={crudActions}
        />
      </div>
    )
  }
}
