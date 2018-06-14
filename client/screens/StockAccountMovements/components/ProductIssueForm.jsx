import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../../utils/formHelpers'
import { LookupSelectField } from '../../../components'
import { productIssue } from '../../../common/Validators'

const productForm = ({
  pristine,
  submitting,
  handleSubmit,
  handleProductCodeChange,
  productTypeLookup,
  productTypeLookupActions,
  productType
}) => (
  <Form onSubmit={handleSubmit}>
    <Segment attached>
      <Field
        name="productTypeId"
        component={LookupSelectField}
        lookupState={productTypeLookup}
        lookupActions={productTypeLookupActions}
        initialValue={productType && { key: productType.id, text: productType.description }}
        required
        autofocus
      />
      <Field
        name="code"
        type="text"
        component={renderField}
        required
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
      form: 'issueProduct',
      validate: productIssue.validator
    })(productForm)
  }
  render() {
    const { issueProduct, handleProductCodeChange, productTypeLookup, productTypeLookupActions, productType } = this.props
    return (
      <this.productReceiveForm {...{ onSubmit:
        issueProduct,
        handleProductCodeChange,
        productTypeLookup,
        productTypeLookupActions,
        productType }}
      />
    )
  }
}

export default ProductForm
