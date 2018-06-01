import React, { Component } from 'react'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import { getCrudPageActions } from '../../actions/products'
import { productTypes } from '../../selectors'

export default class CarrierCrud extends Component {
  constructor(props) {
    super(props)
    this.gridColumns = [
      { property: 'description', label: 'Descripción' },
      { property: 'ean', label: 'EAN' }
    ]
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    const crudActions = getCrudPageActions()
    return (
      <div>
        <CrudContainer
          crudPage="product"
          gridColumns={this.gridColumns}
          selectors={productTypes}
          formModal={FormModal}
          toolbar={ToolbarContainer}
          crudActions={crudActions}
        />
      </div>
    )
  }
}
