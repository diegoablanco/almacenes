import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageBar from '../../common/MessageBar/MessageBar'
import CustomerCrud from './CustomerCrudContainer'

class Screen extends Component{
  render(){    
    return (
      <div>
        <MessageBar />
        <CustomerCrud />
      </div>
    )
  } 
}
export default connect()(Screen)