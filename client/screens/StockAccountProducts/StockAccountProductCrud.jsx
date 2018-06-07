import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { feathersServices } from '../../feathers'
import getCrudPageActions from '../../actions/warehouseServices'
import crudPages from '../../common/CrudPages'
import StockAccountProductFormModal, { formName } from './StockAccountProductFormModal'
import CrudContainer from '../../common/CrudContainer'
import * as selectors from '../../selectors/warehouseServices'

const crudActions = getCrudPageActions(
  crudPages.WAREHOUSESERVICES,
  feathersServices.warehouseServices,
  selectors
)

class StockAccountProductCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'productType.description', label: 'Descripción' },
      { property: 'productType.ean', label: 'EAN' },
      { property: 'code', label: 'Código' }
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
          formModal={StockAccountProductFormModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(StockAccountProductCrud)
