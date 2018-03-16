import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, getFormValues, FormSection } from 'redux-form'
import { Grid, Tab } from 'semantic-ui-react'
import LookupSelectField from '../../../components/LookupSelectField'
import GoodsResume from '../components/GoodsResume'
import { DateTimeField, Address } from '../../../components'

class IssueForm extends Component {
  constructor(props) {
    super(props)
    this.getPanes = this.getPanes.bind(this)
  }
  getPanes() {
    const {
      carrierLookup,
      carrierLookupActions,
      carrier,
      stock = {},
      getServicesPane,
      getDocumentsPane,
      getImagesPane } = this.props
    return [
      { menuItem: 'Detalles',
        pane:
  <Tab.Pane>
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column >
        <GoodsResume stock={stock} />
        <Field
          name="date"
          component={DateTimeField}
          label="Fecha"
        />
        <Field
          name="carrierId"
          component={LookupSelectField}
          lookupState={carrierLookup}
          lookupActions={carrierLookupActions}
          initialValue={carrier && { key: carrier.id, text: carrier.companyName }}
          label="Transportista"
          placeholder="Buscar un transportista..."
        />
        <FormSection name="address">
          <Address />
        </FormSection>
      </Grid.Column>
    </Grid>
  </Tab.Pane>
      },
      getServicesPane(),
      getDocumentsPane(),
      getImagesPane()
    ]
  }
  render() {
    return (
      <Tab
        panes={this.getPanes()}
        menu={{ secondary: true, pointing: true }}
        renderActiveOnly={false}
      />
    )
  }
}

const mapStateToProps = (state, { formName }) => ({
  stock: getFormValues(formName)(state)
})

export default connect(mapStateToProps)(IssueForm)
