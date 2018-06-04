import React, { Component } from 'react'
/* eslint new-cap: 0 */
import { Route, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'react-router-redux'
import { ErrorBoundary } from './components'

import UserSignIn from './screens/Users/UserSignIn'
import UserSignUp from './screens/Users/UserSignUp'
import UserSignUpSendEmail from './screens/Users/UserSignUpSendEmail'
import UserSignUpValidateEmail from './screens/Users/UserSignUpValidateEmail'
import UserForgotPwdSendEmail from './screens/Users/UserForgotPwdSendEmail'
import UserForgotPwdReset from './screens/Users/UserForgotPwdReset'
import UserPasswordChange from './screens/Users/UserPasswordChange'
import UserSignInPending from './screens/Users/UserSignInPending'
import App from './screens/App'

import Customers from './screens/Customers'
import Warehouses from './screens/Warehouses'
import Services from './screens/Services'
import Carriers from './screens/Carriers'
import Stock from './screens/Stock'
import Product from './screens/Products'
import StockAccountMovements from './screens/StockAccountMovements'

const authenticatedSelector = state => state.auth.user && state.auth.user.isVerified
// Authentication Higher Order Components to wrap route components.
const UserIsAuthenticated = connectedRouterRedirect({
  // extract user data from state
  authenticatedSelector,
  /* When signin is pending but not fulfilled: */
  // determine if signin is pending
  authenticatingSelector: state => state.auth.isLoading,
  // component to render while signin is pending
  AuthenticatingComponent: UserSignInPending,
  // route to signin component
  redirectPath: '/user/signin',
  /* Once signin is successful: */
  // redirect on successful signin to component being authenticated
  allowRedirectBack: true,
  // action to dispatch to redirect
  redirectAction: routerActions.replace,
  /* For documentation: */
  wrapperDisplayName: 'UserIsAuthenticated'
});

const UserIsAdmin = connectedRouterRedirect({
  authenticatedSelector: (state) => {
    const { user } = state.auth
    if (!(user && user.isVerified && user.roles)) {
      return false;
    }
    return user.roles.includes('admin')
  },
  redirectPath: '/user/signin',
  allowRedirectBack: false,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAdmin'
});

// Routing
export default class AppRouter extends Component {
  render() {
    return (
      <AppContainer>
        <App>
          <ErrorBoundary>
            <Switch>
              <Route path="/user/signin" component={UserSignIn} />
              <Route path="/user/signup" component={UserIsAdmin(UserSignUp)} />
              <Route path="/user/signupsendemail" component={UserSignUpSendEmail} />
              <Route path="/user/verify/:token" component={UserSignUpValidateEmail} />
              <Route path="/user/forgotpwdsendemail" component={UserForgotPwdSendEmail} />
              <Route path="/user/forgot/:token" component={UserForgotPwdReset} />
              <Route
                path="/user/passwordchange"
                component={UserIsAuthenticated(UserPasswordChange)}
              />
              <Route path="/customers" component={UserIsAuthenticated(Customers)} />
              <Route path="/warehouses" component={UserIsAuthenticated(Warehouses)} />
              <Route path="/services" component={UserIsAuthenticated(Services)} />
              <Route path="/carriers" component={UserIsAuthenticated(Carriers)} />
              <Route path="/stock" component={UserIsAuthenticated(Stock)} />
              <Route path="/products" component={UserIsAuthenticated(Product)} />
              <Route path="/stockAccountMovements" component={UserIsAuthenticated(StockAccountMovements)} />
              <Route component={UserSignIn} />
            </Switch>
          </ErrorBoundary>
        </App>
      </AppContainer>
    )
  }
}
