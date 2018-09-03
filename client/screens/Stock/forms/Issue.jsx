import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, formValues, getFormValues, FormSection, FieldArray } from 'redux-form'
import { Grid, Tab } from 'semantic-ui-react'
import { renderRadio } from '../../../utils/formHelpers'
import LookupSelectField from '../../../components/LookupSelectField'
import { DateTimeField, Address } from '../../../components'
import ReferencesFields from '../components/ReferencesFields'

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
      getServicesPane,
      getDocumentsPane,
      getImagesPane,
      stock = {} } = this.props
    return [
      { menuItem: 'Detalles',
        pane:
  <Tab.Pane>
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column >
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
          placeholder="Buscar..."
        />
        <FormSection name="address">
          <Address />
        </FormSection>
      </Grid.Column>
    </Grid>
  </Tab.Pane>
      },
      { menuItem: 'Referencias',
        pane:
  <Tab.Pane>
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column >
        <Field
          name="issueType"
          label="Salida Total"
          radioValue="full"
          value="full"
          component={formValues({ currentValue: 'issueType' })(renderRadio)}
        />
        <Field
          name="issueType"
          label="Salida Parcial"
          radioValue="partial"
          value="partial"
          component={formValues({ currentValue: 'issueType' })(renderRadio)}
        />
        <FieldArray
          name="references"
          component={ReferencesFields}
          enableIssue={stock.issueType === 'partial'}
          enableDelete={false}
        />
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
