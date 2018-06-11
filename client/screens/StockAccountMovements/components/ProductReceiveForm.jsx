import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../../utils/formHelpers'
import { productReceive } from '../../../common/Validators'

const productForm = ({ pristine, submitting, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Segment attached>
      <Field
        name="ean"
        type="text"
        component={renderField}
        required
        autofocus
      />
      <Field
        name="code"
        type="text"
        component={renderField}
        required
      />
      <Button primary type="submit" size="small" disabled={pristine || submitting} loading={submitting}>Agregar</Button>
    </Segment>
  </Form>
)

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.productReceiveForm = reduxForm({
      form: 'addProduct',
      validate: productReceive.validator
    })(productForm)
  }
  render() {
    const { addProduct } = this.props
    return (
      <this.productReceiveForm onSubmit={addProduct} />
    )
  }
}

export default ProductForm
