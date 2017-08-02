import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Container, Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class AppNavBar extends Component{
  LoggedInMenuItems = () => {
    const {user} = this.props
    return([       
      <Menu.Item key="customers">
        <Link to="customers">Clientes</Link>
      </Menu.Item>,
      <Menu.Item as='a' key="page1">Page 11</Menu.Item>,
      <Menu.Menu position='right' key="profile">
        <Dropdown item text={user.username} >
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="user/signin">Salir</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    ])
  }

  render(){
    const {user} = this.props
    const userAuthenticated = user && user.isVerified
    return(    
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header>
            Project Name
          </Menu.Item>
          {userAuthenticated && this.LoggedInMenuItems()}   
        </Container>
      </Menu>
    )
  }
}
    
const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AppNavBar);