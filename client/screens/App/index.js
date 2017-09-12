
import React, {Component} from 'react';
import AppNavBar from './components/AppNavBar';
import { Container } from 'semantic-ui-react'

export default class App extends Component{
  render (){
    const {
      children
    } = this.props
    return (
      <Container>
        <AppNavBar label="App" screen="app/main" location={this.props.location} />
        <Container className="main-container">
          {children}
        </Container>
      </Container>
    )
  }
}
