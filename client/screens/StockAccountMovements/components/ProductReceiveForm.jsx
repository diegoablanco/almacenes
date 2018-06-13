import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../../utils/formHelpers'
import { productReceive } from '../../../common/Validators'

const productForm = ({ pristine, submitting, handleSubmit, handleEanChange, handleProductCodeChange }) => (
  <Form onSubmit={handleSubmit}>
    <Segment attached>
      <Field
        name="ean"
        type="text"
        component={renderField}
        required
        autofocus
        onChange={(e, value) => handleEanChange(value)}
      />
      <Field
        name="code"
        type="text"
        component={renderField}
        required
        onChange={(event, code) => handleProductCodeChange({ formName: 'addProduct', code })}
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
    const { addProduct, handleEanChange, handleProductCodeChange } = this.props
    return (
      <this.productReceiveForm onSubmit={addProduct} {...{ handleEanChange, handleProductCodeChange }} />
    )
  }
}

export default ProductForm
