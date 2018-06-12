import React, { Component } from 'react'
import { Form, Segment, Grid } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderField } from '../../utils/formHelpers'

class ProductCategoryForm extends Component {
  render() {
    const { loading } = this.props

    return (
      <Form loading={loading}>
        <Grid verticalAlign="middle" centered textAlign="center">
          <Grid.Column tablet={10} mobile={16} computer={10}>
            <Segment>
              <Field
                name="description"
                component={renderField}
                required
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

export default ProductCategoryForm
