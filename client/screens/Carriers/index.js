import React, { Component } from 'react'
import { connect } from 'react-redux'
import CrudContainer from './CrudContainer'

class Screen extends Component{
  render(){    
    return (
      <div>
        <CrudContainer />
      </div>
    )
  } 
}
export default connect()(Screen)