
/* eslint new-cap: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerReducer, routerActions, routerMiddleware, push } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

// Authentication Higher Order Components to wrap route components.
const UserIsAuthenticated = connectedRouterRedirect({
  // extract user data from state
  authenticatedSelector: state => state.auth.user && state.auth.user.isVerified,
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
export default function (store, history) {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
            <Switch>
              <Redirect exact path="/" to={config.client.defaultRoute} />
              <Route path={config.client.defaultRoute} component={UserIsAuthenticated(App)} />
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
            </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}