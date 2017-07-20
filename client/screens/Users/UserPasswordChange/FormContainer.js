import {
  reduxForm,
  SubmissionError
} from 'redux-form';
import {
  push
} from 'react-router-redux';
import {
  connect
} from 'react-redux';
import errors from 'feathers-errors';

import {
  feathersServices
} from '../../../feathers';
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const handleSubmit = (values, dispatch, user) => new Promise((resolve, reject) => {
  dispatch(feathersServices.authManagement.create({
      action: 'passwordChange',
      value: {
        user: {
          email: user.email
        },
        oldPassword: values.oldPassword,
        password: values.password
      }
    }))
    .then(() => {
      dispatch(push('/user/profile'));
      resolve();
    })
    .catch(err => reject(err instanceof errors.BadRequest ?
      new SubmissionError(Object.assign({}, err.errors, {
        _error: err.message || ''
      })) :
      err
    ));
});

const mapStateToProps = (state, ownProps) => {
  return {onSubmit: (values, dispatch) => handleSubmit(values, dispatch, state.auth.user)}
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'UserPasswordChange',
    validate: usersClientValidations.changePassword
  })(Form)
);