import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCategoryCrud from './CrudContainer'

class Screen extends Component {
  render() {
    return (
      <div>
        <ProductCategoryCrud />
      </div>
    )
  }
}
export default connect()(Screen)
