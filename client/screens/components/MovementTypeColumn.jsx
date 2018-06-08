import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'
import intl from 'react-intl-universal'
import getUneditables from '../../selectors/uneditables'

class MovementTypeColumn extends Component {
  renderLabel({ code, color }) {
    return (<Label color={color} horizontal>{intl.get(`common.stockMovementType.${code}`)}</Label>)
  }
  render() {
    const { type, stockMovementTypes } = this.props
    const stockMovementType = stockMovementTypes.find(({ code }) => code === type)
    return (
      <div>
        { this.renderLabel(stockMovementType) }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { stockMovementTypes } = getUneditables(state)
  return { stockMovementTypes }
}

export default connect(mapStateToProps)(MovementTypeColumn)
