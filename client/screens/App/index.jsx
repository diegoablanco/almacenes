
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import AppNavBar from './components/AppNavBar';
import MessageBar from '../../common/MessageBar/MessageBar'

const AppNavBarWithRouter = withRouter(AppNavBar)
export default class App extends Component {
  render() {
    const {
      children
    } = this.props
    return (
      <Container>
        <AppNavBarWithRouter label="App" screen="app/main" />
        <Container className="main-container">
          <MessageBar />
          {children}
        </Container>
      </Container>
    )
  }
}
