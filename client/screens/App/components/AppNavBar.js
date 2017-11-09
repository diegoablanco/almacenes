import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Container, Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { config } from '../../../utils/config';

class AppNavBar extends Component{
  LoggedInMenuItems = (props) => {
    const {user, location: {pathname}} = props
    return([       
      <Menu.Item key="customers" active={ pathname === '/customers' }>
        <Link to="customers">Clientes</Link>
      </Menu.Item>,
      <Menu.Item key="warehouses" active={ pathname === '/warehouses' }>
        <Link to="warehouses">Almacenes</Link>
      </Menu.Item>,
      <Menu.Item key="warehouseServicess" active={ pathname === '/services' }>
        <Link to="services">Servicios de Almacén</Link>
      </Menu.Item>,
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
    const { client: { appName }} = config
    const {user} = this.props
    const userAuthenticated = user && user.isVerified
    return(    
      <Menu fixed='top' pointing>
        <Container>
          <Menu.Item header>
            {appName}
          </Menu.Item>
          {userAuthenticated && this.LoggedInMenuItems(this.props)}   
        </Container>
      </Menu>
    )
  }
}
    
const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AppNavBar);