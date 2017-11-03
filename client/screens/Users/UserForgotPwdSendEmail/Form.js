
import React from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button, Form, Grid, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { renderField } from '../../../utils/formHelpers'

const ForgotPwdForm = props => {
  const { handleSubmit, pristine, reset, submitting, invalid, error } = props;

  return (
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column tablet={10} mobile={16} computer={6}>
        {error && <Message error>{error}</Message>}
        <Message attached header="Blanquear Contraseña" content="Ingrese su email para recibir un correo con instrucciones para blanquear la contraseña" />
        <Form onSubmit={handleSubmit} size='large' className="attached fluid segment">
          <Field name="email" 
              type="text" 
              label="Email"
              icon='user'
              iconPosition='left' 
              component={renderField}/>        
          <Button primary type='submit' size='large' disabled={pristine || submitting} loading={submitting}>Enviar</Button>
          <Link to="signin">Ingresar</Link>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

ForgotPwdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default ForgotPwdForm;
