import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { feathersServices } from '../../feathers'
import { getCrudPageActions } from '../../actions/crudPage'
import crudPages from '../../common/CrudPages'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import { productCategories as selectors } from '../../selectors'

const crudActions = getCrudPageActions(
  crudPages.PRODUCTCATEGORIES,
  feathersServices.productCategories,
  selectors
)

class ProductCategoryCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'description', label: 'Descripción' }
    ]
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div>
        <CrudContainer
          crudPage="productCategory"
          gridColumns={this.gridColumns}
          selectors={selectors}
          formModal={FormModal}
          crudActions={crudActions}
          enableAdd
        />
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...crudActions
}, dispatch)

export default connect(null, mapDispatchToProps)(ProductCategoryCrud)
