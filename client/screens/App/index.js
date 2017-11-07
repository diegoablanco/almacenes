
import React, {Component} from 'react';
import AppNavBar from './components/AppNavBar';
import { Container } from 'semantic-ui-react'
import MessageBar from '../../common/MessageBar/MessageBar'
import { withRouter } from 'react-router'

const AppNavBarWithRouter = withRouter(AppNavBar)
export default class App extends Component{
  render (){
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
