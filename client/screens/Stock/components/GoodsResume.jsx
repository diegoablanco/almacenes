import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Statistic, Segment } from 'semantic-ui-react'
import getUneditables from '../../../selectors/uneditables'

class GoodsResume extends Component {
  constructor(props) {
    super(props)
    this.renderInfo = this.renderInfo.bind(this)
  }
  renderBoxesInfo({ quantity, individualWeight }) {
    const items = [
      { key: 'quantity', label: 'Cantidad', value: `${quantity} Cajas` },
      { key: 'weight', label: 'Peso Individual', value: individualWeight }
    ]
    return (
      <Statistic.Group items={items} />
    )
  }
  renderPaletsInfo({
    quantity,
    unitsPerPallet,
    individualWeight
  }) {
    const items = [
      { key: 'quantity', label: 'Cantidad', value: `${quantity} Palets` },
      { key: 'unitsPerPallet', label: 'Unidades por Palet', value: unitsPerPallet },
      { key: 'individualWeight', label: 'Peso Individual', value: individualWeight }
    ]
    return (
      <Statistic.Group items={items} />
    )
  }
  renderInfo() {
    const {
      stock: {
        quantity,
        reference
      }
    } = this.props
    const items = [
      { key: 'reference', label: 'Referencia', value: `${reference}` },
      { key: 'quantity', label: 'Cantidad de Unidades', value: `${quantity}` }
    ]
    return (
      <Statistic.Group items={items} />
    )
  }
  render() {
    const { stock } = this.props
    return (
      <Segment>
        { stock && this.renderInfo() }
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const { stockItemDetailTypes } = getUneditables(state)
  return {
    stockItemDetailTypes
  }
}

export default connect(mapStateToProps)(GoodsResume)
