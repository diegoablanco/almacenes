
import React from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button } from 'semantic-ui-react'

import { renderField } from '../../../utils/formHelpers'

const PasswordChangeForm = props => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="oldPassword"
        type="text"
        label="Contraseña Actual"
        component={renderField}
      />
      <Field
        name="newPassword"
        type="text"
        label="Nueva Contraseña"
        component={renderField}
      />
      <Field
        name="confirmPassword"
        type="text"
        label="Confirmar Contraseña"
        component={renderField}
      />
      <Button
        primary
        type="submit"
        size="large"
        disabled={pristine || submitting}
        loading={submitting}
      >
        Enviar
      </Button>
    </form>
  )
}

PasswordChangeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default PasswordChangeForm
