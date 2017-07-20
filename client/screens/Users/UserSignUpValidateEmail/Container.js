
import { connect } from 'react-redux';
import { feathersServices, feathersAuthentication } from '../../../feathers';

import Component from './Component'; // eslint-disable-line import/no-unresolved

const mapStateToProps = (state) => ({
  user: state.authManagement.data || {},
  signUpEmailTokenStatus: (() => {
    const {authManagement} = state;
    if (!authManagement.isFinished) { return 'checking'; }
    if (!authManagement.isError) { return 'verified'; }
    const vrErr = authManagement.isError.errors;
    if (!vrErr || !vrErr.$className) { return 'general'; }
    return vrErr.$className;
  })(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  validateSignUpEmailToken: (emailToken) => {
    dispatch(feathersServices.authManagement.create({ action: 'verifySignupLong', value: emailToken }))
      .catch(() => {}); // Nav bar will display error status
  },
  resetMe: () => {
    dispatch(feathersAuthentication.logout());
  },
  resend: () => {
    dispatch(feathersServices.verifyReset.create(
      { action: 'resend', value: { verifyToken: ownProps.emailToken } }
    ));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
