import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Grid, Form, Tab, Message } from 'semantic-ui-react'
import { renderTextArea } from '../../utils/formHelpers'
import DocumentAttachmentFields from '../../components/DocumentAttachmentFields'
import ImageAttachmentFields from '../../components/ImageAttachmentFields'
import SelectField from '../../common/SelectField'
import GeneralInfoFields from './GeneralInfoFields'
import GoodsPane from './Goods'
import getServiceFields from './ServiceFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'

export default class StockForm extends Component {
  constructor(props) {
    super(props)
    this.getGeneralInfoPane = this.getGeneralInfoPane.bind(this)
    this.getDocumentsPane = this.getDocumentsPane.bind(this)
    this.getInstructionsPane = this.getInstructionsPane.bind(this)
    this.getGoodsPane = this.getGoodsPane.bind(this)
    this.getPanesByMovementType = this.getPanesByMovementType.bind(this)
    this.getServicesPane = this.getServicesPane.bind(this)
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
        <GeneralInfoFields {...this.props} />
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
  getPanesByMovementType(movementType) {
    const {
      getGeneralInfoPane,
      getInstructionsPane,
      getGoodsPane,
      getDocumentsPane,
      getImagesPane,
      getServicesPane
    } = this
    switch (movementType.code) {
      case 'preReceive':
        return [getGeneralInfoPane(), getInstructionsPane()]
      case 'receive':
      case 'edit':
        return [getGeneralInfoPane(), getInstructionsPane(), getGoodsPane(), getDocumentsPane(), getImagesPane(), getServicesPane()]
      default:
        return []
    }
  }
  render() {
    const {
      extras: { stockMovementType },
      error
    } = this.props

    const panes = this.getPanesByMovementType(stockMovementType)

    return (
      <div>
        {error && <Message error>{error}</Message>}
        <Form>
          <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
        </Form>
      </div>
    )
  }
}
