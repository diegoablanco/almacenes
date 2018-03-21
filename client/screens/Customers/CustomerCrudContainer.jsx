import React, { Component } from 'react'
import { feathersServices } from '../../feathers'
import CustomerFormModal from './CustomerFormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import crudPages from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/customers'

export default class CustomerCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'id', label: 'Código' },
      { property: 'companyName', label: 'Nombre' },
      { property: 'authorizedSignatory.name', label: 'Firmante Autorizado' },
      { property: 'authorizedSignatory.email', label: 'E-mail' },
      { property: 'authorizedSignatory.phones[0].number', label: 'Teléfono' }
    ]
    this.confirmModalOptions = {
      title: 'Eliminar Cliente',
      message: '¿Confirma eliminar el cliente?'
    }
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    const crudActions = getCrudPageActions(crudPages.CUSTOMERS, feathersServices.customers, selectors)
    return (
      <div>
        <CrudContainer
          gridColumns={this.gridColumns}
          confirmModalOptions={this.confirmModalOptions}
          selectors={selectors}
          formModal={CustomerFormModal}
          toolbar={ToolbarContainer}
          crudActions={crudActions}
        />
      </div>
    )
  }
}
