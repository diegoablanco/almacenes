
import React, { Component } from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import errors from 'feathers-errors'

import { config } from '../../../utils/config'
import Form from './Form'
import usersClientValidations from '../../../../common/helpers/usersClientValidations'
import { bindActionCreators  } from 'redux'
import { registerUser, validateUser } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    onSubmit: registerUser, 
    asyncValidate: validateUser },
  dispatch)
}

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'UserSignUp',
    asyncBlurFields: ['username', 'email'],
    validate: usersClientValidations.signup
  })(Form)
)