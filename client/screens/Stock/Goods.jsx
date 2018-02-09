import React from 'react'
import { Field, FieldArray, formValues } from 'redux-form'
import { Grid, Tab, Form } from 'semantic-ui-react'
import { renderCheckbox, renderRadio, renderField, parseToInt } from '../../utils/formHelpers'
import AditionalStockDetailFields from './AditionalStockDetailFields'

export default function getGoodsPane({ availableStockItemDetailTypes }) {
  const boxesPane = {
    menuItem: 'Cajas',
    pane: <Tab.Pane attached={false} key="boxes">
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={14}>
          <Form.Group widths="equal">
            <Field
              name="boxes.quantity"
              type="text"
              label="Cantidad"
              parse={parseToInt}
              component={renderField}
            />
            <Field
              name="boxes.individualWeight"
              type="text"
              label="Peso individual"
              parse={parseToInt}
              component={renderField}
            />
            <Field
              name="boxes.totalWeight"
              type="text"
              label="Peso total"
              parse={parseToInt}
              component={renderField}
            />
          </Form.Group>
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
          <FieldArray
            name="boxes.details"
            label="Detalles Adicionales"
            component={AditionalStockDetailFields}
            availableDetailTypes={availableStockItemDetailTypes.filter(x => ['signOfHandling', 'crashed', 'damaged', 'wet'].includes(x.code)).map(x => ({ key: x.id, value: x.id, text: x.description }))}
          />
        </Grid.Column>
      </Grid>
    </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
  }
  const paletsPane = {
    menuItem: 'Pallets',
    pane: <Tab.Pane attached={false} key="palets">
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={14}>
          <Form.Group widths="equal">
            <Field
              name="palets.quantity"
              type="text"
              label="Cantidad"
              parse={parseToInt}
              component={renderField}
            />
            <Field
              name="palets.unitsPerPallet"
              type="text"
              label="Unidades por Pallet"
              parse={parseToInt}
              component={renderField}
            />
            <Field
              name="palets.totalUnits"
              type="text"
              label="Cantidad Total"
              parse={parseToInt}
              component={renderField}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Field
              name="palets.individualWeight"
              type="text"
              label="Peso individual"
              parse={parseToInt}
              component={renderField}
            />
            <Field
              name="palets.totalWeight"
              type="text"
              label="Peso total"
              parse={parseToInt}
              component={renderField}
            />
          </Form.Group>
          <Field
            name="palets.shrinkWrapped"
            label="Retractilados"
            component={renderCheckbox}
          />
          <Field
            name="palets.sealOverShrinkWrap"
            label="Precinto sobre retráctil"
            component={renderCheckbox}
          />
          <Field
            name="palets.hoopStrap"
            label="Fleje"
            component={renderCheckbox}
          />
          <FieldArray
            name="palets.details"
            label="Detalles Adicionales"
            component={AditionalStockDetailFields}
            availableDetailTypes={availableStockItemDetailTypes.filter(x => ['signOfHandling', 'damagedpallet', 'wetpallet'].includes(x.code)).map(x => ({ key: x.id, value: x.id, text: x.description }))}
          />
        </Grid.Column>
      </Grid>
    </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
  }
  return (
    <div>
      <Field
        name="onHold"
        label="On Hold"
        component={renderCheckbox}
      />
      <Tab
        panes={[boxesPane, paletsPane]}
        menu={{ secondary: true, pointing: true }}
        renderActiveOnly={false}
      />
    </div>
  )
}
