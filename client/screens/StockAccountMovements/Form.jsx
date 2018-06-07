import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Form, Segment, Grid, Divider, Tab } from 'semantic-ui-react'
import { renderField, renderTextArea, parseToFloat } from '../../utils/formHelpers'
import tabulatedFormFields from '../../utils/tabulatedFormFields'
import { ValidationSummary } from '../../components'
import ProductFields from './components/ProductFields'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.productsFieldsComponent = tabulatedFormFields({
      title: 'Productos',
      getFieldCells: ProductFields,
      crudPage: 'products'
    })
  }
  render() {
    const { loading } = this.props
    const panes = [
      { menuItem: 'Productos',
        pane: <Tab.Pane key="products">
          <Grid verticalAlign="middle" centered textAlign="center">
            <Grid.Column tablet={10} mobile={16} computer={10}>

              <FieldArray
                name="products"
                component={this.productsFieldsComponent}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
      }
    ]
    return (
      <Form loading={loading}>
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
      </Form>
    )
  }
}

export default ProductForm
