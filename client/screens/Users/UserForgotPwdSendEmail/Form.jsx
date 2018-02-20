
import React from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button, Form, Grid, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { renderField } from '../../../utils/formHelpers'

const ForgotPwdForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  return (
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column tablet={10} mobile={16} computer={6}>
        {error && <Message error>{error}</Message>}
        <Message
          attached
          header="Blanquear Contraseña"
          content="Ingrese su email para recibir un correo con instrucciones para blanquear la contraseña" // eslint-disable-line max-len
        />
        <Form onSubmit={handleSubmit} size="large" className="attached fluid segment">
          <Field
            name="email"
            type="text"
            icon="user"
            iconPosition="left"
            label="Email"
            component={renderField}
          />
          <Button
            primary
            type="submit"
            size="large"
            disabled={pristine || submitting}
            loading={submitting}
          >Enviar
          </Button>
          <Link to="signin"> { // eslint-disable-line jsx-a11y/anchor-is-valid
          }
            Ingresar
          </Link>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

ForgotPwdForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired
};

export default ForgotPwdForm;
