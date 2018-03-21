import React, { Component } from 'react'
import { Grid, Form, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderField, parseToFloat } from '../../utils/formHelpers'
import { ValidationSummary } from '../../components'

class ServiceForm extends Component {
  render() {
    const { loading, error } = this.props;

    return (
      <div>
        { ValidationSummary(error) }
        <Form loading={loading}>
          <Segment>
            <Grid verticalAlign="middle" centered textAlign="center">
              <Grid.Column tablet={10} mobile={16} computer={6}>
                <Field
                  name="description"
                  type="text"
                  label="Descripción"
                  component={renderField}
                  required
                />
                <Field
                  name="rate"
                  type="text"
                  label="Tarifa"
                  parse={parseToFloat}
                  component={renderField}
                  required
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default ServiceForm
