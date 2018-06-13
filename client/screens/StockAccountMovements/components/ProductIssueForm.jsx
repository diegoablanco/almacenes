import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../../utils/formHelpers'

const productForm = ({ pristine, submitting, handleSubmit, handleProductCodeChange }) => (
  <Form onSubmit={handleSubmit}>
    <Segment attached>
      <Field
        name="code"
        type="text"
        component={renderField}
        required
        autofocus
        onChange={(e, code) => handleProductCodeChange({ formName: 'issueProduct', code })}
      />
      <Button primary type="submit" size="small" disabled={pristine || submitting} loading={submitting}>Agregar</Button>
    </Segment>
  </Form>
)
class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.productReceiveForm = reduxForm({
      form: 'issueProduct'
    })(productForm)
  }
  render() {
    const { issueProduct, handleProductCodeChange } = this.props
    return (
      <this.productReceiveForm {...{ onSubmit: issueProduct, handleProductCodeChange }} />
    )
  }
}

export default ProductForm
