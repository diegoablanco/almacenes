import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Form, Grid, Tab } from 'semantic-ui-react'
import { renderField } from '../../utils/formHelpers'
import tabulatedFormFields from '../../utils/tabulatedFormFields'
import ProductFields from './components/ProductFields'
import { DateTimeField, ValidationSummary } from '../../components'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    const { bindActions: { focusLastRowField } } = props
    this.productsFieldsComponent = tabulatedFormFields({
      title: 'Productos',
      getFieldCells: ProductFields,
      crudPage: 'product',
      onRowAdded: focusLastRowField
    })
    this.getReceivePanes = this.getReceivePanes.bind(this)
    this.getIssuePanes = this.getIssuePanes.bind(this)
    this.getPanesByMovementType = this.getPanesByMovementType.bind(this)
  }
  getReceivePanes() {
    return [
      { menuItem: 'Detalles',
        pane: <Tab.Pane key="details">
          <Grid verticalAlign="middle" centered textAlign="center">
            <Grid.Column tablet={10} mobile={16} computer={6}>
              <Field
                name="date"
                component={DateTimeField}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
      },
      { menuItem: 'Productos',
        pane: <Tab.Pane key="products" attached={false}>
          <Grid verticalAlign="middle" centered textAlign="center">
            <Grid.Column tablet={10} mobile={16} computer={16}>
              <FieldArray
                name="products"
                component={this.productsFieldsComponent}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
      }
    ]
  }
  getIssuePanes() {
    return [
      { menuItem: 'Detalles',
        pane: <Tab.Pane key="details">
          <Grid verticalAlign="middle" centered textAlign="center">
            <Grid.Column tablet={10} mobile={16} computer={6}>
              <Field
                name="date"
                component={DateTimeField}
              />
              <Field
                name="receipt"
                type="text"
                component={renderField}
                required
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
      },
      { menuItem: 'Productos',
        pane: <Tab.Pane key="products" attached={false}>
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
  }
  getPanesByMovementType(movementType) {
    const {
      getReceivePanes,
      getIssuePanes
    } = this
    switch (movementType.code) {
      case 'issue':
        return getIssuePanes()
      case 'receive':
        return getReceivePanes()
      default:
        return []
    }
  }

  render() {
    const {
      extras: { stockMovementType }, loading, error } = this.props
    const panes = this.getPanesByMovementType(stockMovementType)
    return (
      <div>
        { ValidationSummary(error) }
        <Form loading={loading}>
          <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
        </Form>
      </div>
    )
  }
}

export default ProductForm
