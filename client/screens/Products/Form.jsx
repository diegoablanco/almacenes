import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Form, Segment, Grid } from 'semantic-ui-react'
import { renderField, renderTextArea } from '../../utils/formHelpers'
import { ValidationSummary, LookupSelectField } from '../../components'

class ProductForm extends Component {
  render() {
    const { loading, error, productCategoryLookup, productCategoryLookupActions, category } = this.props

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
                  component={renderField}
                  required
                />
                <Field
                  name="categoryId"
                  component={LookupSelectField}
                  lookupState={productCategoryLookup}
                  lookupActions={productCategoryLookupActions}
                  initialValue={category && { key: category.id, text: category.companyName }}
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
