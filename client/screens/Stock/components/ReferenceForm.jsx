import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField, parseToInt } from '../../../utils/formHelpers'
import { productReference } from '../../../common/Validators'

const productForm = ({ pristine, submitting, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Segment attached>
      <Field
        name="reference"
        type="text"
        component={renderField}
        required
      />
      <Field
        name="quantity"
        type="text"
        parse={parseToInt}
        component={renderField}
        width={4}
        required
      />
      <Button primary type="submit" size="small" disabled={pristine || submitting} loading={submitting}>Agregar</Button>
    </Segment>
  </Form>
)

class ProductReferenceForm extends Component {
  constructor(props) {
    super(props)      
    this.productReferenceForm = reduxForm({
      form: 'addReference',
      resourceKey: 'stock.reference',
      validate: productReference.validator
    })(productForm)
  }
  
  render() {
    const { addReference } = this.props
    return (
      <this.productReferenceForm onSubmit={addReference} />
    )
  }
}

export default ProductReferenceForm
