import React from 'react'
import { Field, formValues, FieldArray } from 'redux-form'
import { Grid, Form, Tab, Accordion, Message } from 'semantic-ui-react'
import { renderTextArea, renderCheckbox, renderRadio, renderField, parseToInt } from '../../utils/formHelpers'
import DocumentAttachmentFields from '../../components/DocumentAttachmentFields'
import ImageAttachmentFields from '../../components/ImageAttachmentFields'
import SelectField from '../../common/SelectField'
import GeneralInfoFields from './GeneralInfoFields'

function getGoodsPane() {
  return (
    <Tab.Pane attached={false}>
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={14}>
          <Accordion>
            <Accordion.Title>
              Cajas
            </Accordion.Title>
            <Accordion.Content active>
              <Field
                name="boxes.quantity"
                type="text"
                label="Cantidad"
                parse={parseToInt}
                component={renderField}
              />
              <Field
                name="boxes.opened"
                label="Abiertas"
                component={renderCheckbox}
              />
              <Field
                name="boxes.originalSeals"
                label="Precintos originales"
                component={renderCheckbox}
              />
              <Field
                name="boxes.resealed"
                label="Reprecintadas"
                component={renderCheckbox}
              />
              <Field
                name="boxes.serialNumbers"
                label="Números de serie en cada caja"
                component={renderCheckbox}
              />
              <Field
                name="boxes.shrinkWapped"
                label="Con precinto"
                radioValue="sealed"
                value="sealed"
                component={formValues({ currentValue: 'boxes.shrinkWapped' })(renderRadio)}
              />
              <Field
                name="boxes.shrinkWapped"
                label="Sin precinto"
                radioValue="unsealed"
                value="unsealed"
                component={formValues({ currentValue: 'boxes.shrinkWapped' })(renderRadio)}
              />
            </Accordion.Content>
          </Accordion>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
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
      pane: getGoodsPane()
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
