import {
  reduxForm,
  SubmissionError
} from 'redux-form';
import {
  replace
} from 'react-router-redux';
import {
  connect
} from 'react-redux';
import errors from 'feathers-errors';
import {
  config
} from '../../../utils/config';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';
import Form from './Form';
import { bindActionCreators } from 'redux'
import { login, logout } from '../../../actions/authentication'

const mapStateToProps = (state) => {
  const { uneditables: { queryResult: {registerOpen}}} = state
  return {
    isAuthenticated: state.auth.isSignedIn,
    registerOpen
  }
}

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    ...bindActionCreators({
      onSubmit: login,
      handleLogout: logout
    },
      dispatch),
    handleRedirect: () => {
      ownProps.history.replace(ownProps.redirectTo || config.client.defaultRoute);
    },
  })

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'UserSignIn',
    validate: usersClientValidations.signin
  })(Form)
  );