import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Form, Segment, Grid } from 'semantic-ui-react'
import { renderField, renderTextArea, parseToFloat } from '../../utils/formHelpers'
import { ValidationSummary } from '../../components'

class ProductForm extends Component {
  render() {
    const { loading, error } = this.props

    return (
      <div>
        { ValidationSummary(error) }
        <Form loading={loading}>
          <Segment>
            <Grid verticalAlign="middle" centered textAlign="center">
              <Grid.Column tablet={10} mobile={16} computer={6}>
                <Field
                  name="ean"
                  type="text"
                  parse={parseToFloat}
                  component={renderField}
                  required
                />
                <Field
                  name="description"
                  type="text"
                  component={renderTextArea}
                  rows={5}
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

export default ProductForm
