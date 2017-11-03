import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageBar from '../../common/MessageBar/MessageBar'
import WarehouseCrud from './WarehouseCrudContainer'

class Screen extends Component{
  render(){    
    return (
      <div>
        <WarehouseCrud />
      </div>
    )
  } 
}
export default connect()(Screen)