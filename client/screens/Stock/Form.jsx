import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Grid, Form, Tab, Message } from 'semantic-ui-react'
import { renderTextArea } from '../../utils/formHelpers'
import DocumentAttachmentFields from '../../components/DocumentAttachmentFields'
import ImageAttachmentFields from '../../components/ImageAttachmentFields'
import SelectField from '../../common/SelectField'
import GeneralInfo from './forms/GeneralInfo'
import GoodsPane from './forms/Goods'
import ReleasePane from './forms/Release'
import IssuePane from './forms/Issue'
import getServiceFields from './components/ServiceFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'

export default class StockForm extends Component {
  constructor(props) {
    super(props)
    this.getGeneralInfoPane = this.getGeneralInfoPane.bind(this)
    this.getDocumentsPane = this.getDocumentsPane.bind(this)
    this.getInstructionsPane = this.getInstructionsPane.bind(this)
    this.getGoodsPane = this.getGoodsPane.bind(this)
    this.getFormContentMovementType = this.getFormContentMovementType.bind(this)
    this.getServicesPane = this.getServicesPane.bind(this)
    this.getReleasePane = this.getReleasePane.bind(this)
    this.getIssuePane = this.getIssuePane.bind(this)
  }
  getServicesPane() {
    const {
      availableServices,
      setServiceRate
    } = this.props
    return {
      menuItem: 'Servicios Asociados',
      pane: <Tab.Pane attached={false} key="services">
        <FieldArray name="services" component={tabulatedFormFields('Servicios Asociados', getServiceFields(setServiceRate), availableServices)} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getGeneralInfoPane() {
    return {
      menuItem: 'Información General',
      pane: <Tab.Pane attached={false} key="general-info">
        <GeneralInfo {...this.props} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getDocumentsPane() {
    return {
      menuItem: 'Documentos',
      pane: <Tab.Pane attached={false} key="documents">
        <FieldArray name="documents" component={DocumentAttachmentFields} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getImagesPane() {
    return {
      menuItem: 'Imágenes',
      pane: <Tab.Pane attached={false} key="images">
        <FieldArray name="images" component={ImageAttachmentFields} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getGoodsPane() {
    const {
      availableStockItemDetailTypes
    } = this.props
    return {
      menuItem: 'Mercadería',
      pane: <Tab.Pane attached={false} key="goods">
        <GoodsPane {...{ availableStockItemDetailTypes }} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getReleasePane() {
    const {
      form,
      targetCustomerLookup,
      targetCustomerLookupActions,
      targetCustomer
    } = this.props
    return (
      <ReleasePane
        formName={form}
        {...{ targetCustomerLookup, targetCustomerLookupActions, targetCustomer }}
      />)
  }
  getIssuePane() {
    const {
      form,
      carrierLookup,
      carrierLookupActions,
      carrier
    } = this.props
    const { getDocumentsPane, getImagesPane } = this
    return (
      <IssuePane formName={form} {...{ carrierLookup, carrierLookupActions, carrier, getDocumentsPane, getImagesPane }} />
    )
  }
  getInstructionsPane() {
    const {
      availableInstructions
    } = this.props
    return {
      menuItem: 'Instrucciones',
      pane: <Tab.Pane attached={false} key="instructions">
        <Grid verticalAlign="middle" centered textAlign="center">
          <Grid.Column tablet={10} mobile={16} computer={12}>
            <Field
              name="instructions"
              component={SelectField}
              options={availableInstructions.map(x => ({ key: x.id, value: x.id, text: x.description }))}
              label="Instrucciones"
              multiple
              placeholder="Buscar una instrucción..."
            />
            <Field
              name="customInstructions"
              type="textarea"
              label="Intrucciones adicionales"
              component={renderTextArea}
              rows={5}
            />
          </Grid.Column>
        </Grid>
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getFormContentMovementType(movementType) {
    const {
      getGeneralInfoPane,
      getInstructionsPane,
      getGoodsPane,
      getDocumentsPane,
      getImagesPane,
      getServicesPane,
      getReleasePane,
      getIssuePane
    } = this
    switch (movementType.code) {
      case 'preReceive':
        return <Tab panes={[getGeneralInfoPane(), getInstructionsPane()]} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
      case 'release':
        return getReleasePane()
      case 'issue':
        return getIssuePane()
      case 'receive':
      case 'edit':
        return <Tab panes={[getGeneralInfoPane(), getInstructionsPane(), getGoodsPane(), getDocumentsPane(), getImagesPane(), getServicesPane()]} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
      default:
        return []
    }
  }
  render() {
    const {
      extras: { stockMovementType },
      error
    } = this.props

    return (
      <div>
        {error && error.length > 0 && <Message error>{error}</Message>}
        <Form>
          {this.getFormContentMovementType(stockMovementType)}
        </Form>
      </div>
    )
  }
}
