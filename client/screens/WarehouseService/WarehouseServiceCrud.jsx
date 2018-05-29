import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { feathersServices } from '../../feathers'
import getCrudPageActions from '../../actions/warehouseServices'
import crudPages from '../../common/CrudPages'
import WarehouseServiceFormModal, { formName } from './WarehouseServiceFormModal'
import CrudContainer from '../../common/CrudContainer'
import * as selectors from '../../selectors/warehouseServices'

const crudActions = getCrudPageActions(
  crudPages.WAREHOUSESERVICES,
  feathersServices.warehouseServices,
  selectors
)

class WarehouseServiceCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'stockMovementType.description', label: 'Movimiento de Stock' },
      { property: 'service.description', label: 'Descripción' },
      { property: 'rate', label: 'Tarifa' }
    ]
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div>
        <CrudContainer
          crudPage="warehouseService"
          gridColumns={this.gridColumns}
          selectors={selectors}
          formModal={WarehouseServiceFormModal}
          crudActions={crudActions}
          enableAdd
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  warehouseId: state
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...crudActions,
  loadGrid: () => crudActions.loadGrid(formName)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseServiceCrud)
