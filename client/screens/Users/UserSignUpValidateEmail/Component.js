import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'


class TheComponent extends Component {
  componentDidMount() {
    const {validateSignUpEmailToken, showLoadingMessage, emailToken} = this.props
    showLoadingMessage("Verificando el código...")
    validateSignUpEmailToken(emailToken)
  }
  render(){
    return null
  }
}

export default TheComponent
