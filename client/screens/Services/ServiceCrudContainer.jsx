import React, { Component } from 'react'
import ServiceFormModal from './ServiceFormModal'
import CrudContainer from '../../common/CrudContainer'
import { feathersServices } from '../../feathers'
import ToolbarContainer from './ToolbarContainer'
import crudPages from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/services'

export default class ServiceCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'description', label: 'Descripción' },
      { property: 'rate', label: 'Tarifa' }
    ]
    this.confirmModalOptions = {
      title: 'Eliminar Servicio',
      message: '¿Confirma eliminar el servicio?'
    }
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    const crudActions = getCrudPageActions(crudPages.SERVICES, feathersServices.services, selectors)
    return (
      <div>
        <CrudContainer
          gridColumns={this.gridColumns}
          confirmModalOptions={this.confirmModalOptions}
          selectors={selectors}
          formModal={ServiceFormModal}
          toolbar={ToolbarContainer}
          crudActions={crudActions}
        />
      </div>
    )
  }
}
