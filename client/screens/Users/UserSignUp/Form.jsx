
import React from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Grid, Message } from 'semantic-ui-react'
import { renderField } from '../../../utils/formHelpers'
import SelectField from '../../../common/SelectField'

const SignUpForm = props => {
  const { handleSubmit, pristine, submitting, invalid, roles } = props

  return (
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column tablet={10} mobile={16} computer={6}>
        <Message
          attached
          header="Registrar Usuario"
          content="Complete los campos para registrar un usuario en el sistema"
        />
        <Form onSubmit={handleSubmit} size="large" className="attached fluid segment">
          <Field
            name="name"
            component={renderField}
            label="Nombre"
          />
          <Field
            name="email"
            component={renderField}
            label="Email"
          />
          <Field
            name="username"
            component={renderField}
            label="Usuario"
          />
          <Field
            name="password"
            component={renderField}
            type="password"
            label="Contraseña"
          />
          <Field
            name="confirmPassword"
            component={renderField}
            type="password"
            label="Confirmar contraseña"
          />
          <Field
            name="roles"
            component={SelectField}
            options={roles.map(x => ({ key: x.id, value: x.id, text: x.description }))}
            label="Roles"
            multiple
            placeholder="Buscar un rol..."
          />
          <Button
            position="right"
            onClick={handleSubmit}
            disabled={pristine || invalid || submitting}
            loading={submitting}
          >
            {submitting ? 'Registrando Usuario...' : 'Registrar Usuario'}
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default SignUpForm
