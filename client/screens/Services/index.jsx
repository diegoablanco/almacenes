import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServiceCrudContainer from './ServiceCrudContainer'

class Screen extends Component {
  render() {
    return (
      <div>
        <ServiceCrudContainer />
      </div>
    )
  }
}
export default connect()(Screen)
