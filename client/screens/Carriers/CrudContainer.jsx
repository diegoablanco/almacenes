import React, { Component } from 'react'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import { getCrudPageActions } from '../../actions/carriers'
import * as selectors from '../../selectors/carriers'

export default class CarrierCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'companyName', label: 'Nombre' },
      { property: 'authorizedSignatory.name', label: 'Firmante Autorizado' },
      { property: 'authorizedSignatory.email', label: 'E-mail' },
      { property: 'authorizedSignatory.phones[0].number', label: 'Teléfono' }
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
