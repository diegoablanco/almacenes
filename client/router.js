import React, { Component } from 'react';
/* eslint new-cap: 0 */
import { Route, Redirect, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerReducer, routerActions, routerMiddleware, push } from 'react-router-redux'

import { config } from './utils/config';

import UserSignIn from './screens/Users/UserSignIn';
import UserSignUp from './screens/Users/UserSignUp';
import UserSignUpSendEmail from './screens/Users/UserSignUpSendEmail';
import UserSignUpValidateEmail from './screens/Users/UserSignUpValidateEmail';
import UserForgotPwdSendEmail from './screens/Users/UserForgotPwdSendEmail';
import UserForgotPwdReset from './screens/Users/UserForgotPwdReset';
import UserPasswordChange from './screens/Users/UserPasswordChange';
import UserEmailChange from './screens/Users/UserEmailChange';
import UserProfileChange from './screens/Users/UserProfileChange';
import UserRolesChange from './screens/Users/UserRolesChange';
import UserProfile from './screens/Users/UserProfile';
import UserSignInPending from './screens/Users/UserSignInPending';
import App from './screens/App';

import Customers from './screens/Customers'
import Warehouses from './screens/Warehouses'
import Services from './screens/Services'
import Carriers from './screens/Carriers'

const authenticatedSelector = state => {
  return state.auth.user && state.auth.user.isVerified
}
// Authentication Higher Order Components to wrap route components.
const UserIsAuthenticated = connectedRouterRedirect({
  // extract user data from state
  authenticatedSelector: authenticatedSelector,
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
  wrapperDisplayName: 'UserIsAuthenticated',
});

const UserIsAdmin = connectedRouterRedirect({
  authenticatedSelector: (state) => {
    const { user } = state.auth.user
    if (!(user && user.isVerified && user.roles)) {
      return false;
    }
    return config.users.roles.allowedToChangeRoles.some(role => user.roles.indexOf(role) !== -1)
  },
  redirectPath: '/user/signin',
  allowRedirectBack: false,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAdmin',
});

// Routing
export default class AppRouter extends Component {
  render(){
    return (
      <AppContainer>
        <App>
          <Switch>
            <Route path="/user/signin" component={UserSignIn} />
            <Route path="/user/signup" component={UserSignUp} />
            <Route path="/user/signupsendemail" component={UserSignUpSendEmail} />
            <Route path="/user/verify/:token" component={UserSignUpValidateEmail} />
            <Route path="/user/forgotpwdsendemail" component={UserForgotPwdSendEmail} />
            <Route path="/user/forgot/:token" component={UserForgotPwdReset} />
            <Route path="/user/passwordchange"
              component={UserIsAuthenticated(UserPasswordChange)}
            />
            <Route path="/user/emailchange" component={UserIsAuthenticated(UserEmailChange)} />
            <Route path="/user/profilechange" component={UserIsAuthenticated(UserProfileChange)} />
            <Route path="/user/roleschange"
              component={UserIsAuthenticated(UserIsAdmin(UserRolesChange))}
            />
            <Route path="/user/profile" component={UserIsAuthenticated(UserProfile)} />
            <Route path="/customers" component={UserIsAuthenticated(Customers)} />
            <Route path="/warehouses" component={UserIsAuthenticated(Warehouses)} />
            <Route path="/services" component={UserIsAuthenticated(Services)} />
            <Route path="/carriers" component={UserIsAuthenticated(Carriers)} />
            <Route component={UserSignIn} />
          </Switch>
        </App>
      </AppContainer>
      )
    }
}