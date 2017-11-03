
import React, {Component} from 'react';
import AppNavBar from './components/AppNavBar';
import { Container } from 'semantic-ui-react'
import MessageBar from '../../common/MessageBar/MessageBar'

export default class App extends Component{
  render (){
    const {
      children
    } = this.props
    return (
      <Container>
        <AppNavBar label="App" screen="app/main" location={this.props.location} />
        <Container className="main-container">
          <MessageBar />
          {children}
        </Container>
      </Container>
    )
  }
}
