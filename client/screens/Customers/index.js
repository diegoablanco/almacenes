import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomerCrud from './CustomerCrudContainer'

class Screen extends Component{
  render(){    
    return (
      <div>
        <CustomerCrud />
      </div>
    )
  } 
}
export default connect()(Screen)