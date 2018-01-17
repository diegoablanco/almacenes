import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { Grid, Form, Tab, Message } from 'semantic-ui-react'
import { renderTextArea } from '../../utils/formHelpers'
import DocumentAttachmentFields from '../../components/DocumentAttachmentFields'
import ImageAttachmentFields from '../../components/ImageAttachmentFields'
import SelectField from '../../common/SelectField'
import GeneralInfoFields from './GeneralInfoFields'
import GoodsPane from './Goods'

function getDocumentsPane() {
  return (
    <Tab.Pane attached={false}>
      <FieldArray name="documents" component={DocumentAttachmentFields} />
    </Tab.Pane>
  )
}
export default function StockForm(props) {
  const {
    availableInstructions,
    availableStockItemDetailTypes,
    instructions,
    error
  } = props
  const panes = [
    {
      menuItem: 'Información General',
      pane: <Tab.Pane attached={false}>
        <GeneralInfoFields {...props} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    },
    {
      menuItem: 'Instrucciones',
      pane: <Tab.Pane attached={false}>
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
    },
    {
      menuItem: 'Mercadería',
      pane: <Tab.Pane attached={false}>
        <GoodsPane {...{ availableStockItemDetailTypes }} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    },
    {
      menuItem: 'Documentos',
      pane: getDocumentsPane()
    },
    {
      menuItem: 'Imágenes',
      pane: <Tab.Pane attached={false}>
        <FieldArray name="images" component={ImageAttachmentFields} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  ]
  return (
    <div>
      {error && <Message error>{error}</Message>}
      <Form>
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
      </Form>
    </div>
  )
}
