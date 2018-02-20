
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import { renderField } from '../../../utils/formHelpers'

const SendEmailForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="email"
        component={renderField}
        label="Email"
      />

      <div>
        <Button
          primary
          type="submit"
          size="large"
          disabled={pristine || submitting}
          loading={submitting}
        >
          Enviar Email
        </Button>
      </div>
    </Form>
  )
}

SendEmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default SendEmailForm
