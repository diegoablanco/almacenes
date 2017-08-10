import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button, Form, Grid } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../../utils/formHelpers'

import style from '../components/button.css';

class SignInForm extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleRedirect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.handleLogout();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) { // true after successful submit
      this.props.handleRedirect();
    }
  }
    
  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={6}>
          <Form onSubmit={handleSubmit} size='large'>
            <Field name="email" 
                type="text" 
                label="Email"
                icon='user'
                iconPosition='left' 
                component={renderField}/>        
            <Field name="password" 
                label="Contraseña"  
                type="password" 
                icon='lock'
                iconPosition='left' 
                component={renderField}/>
            <Button primary type='submit' size='large' disabled={pristine || submitting} loading={submitting}>Entrar</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignInForm;
