import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { Grid, Tab, Form } from 'semantic-ui-react'
import { renderCheckbox, renderField, parseToInt } from '../../../utils/formHelpers'
import AditionalStockDetailFields from '../components/AditionalStockDetailFields'

export default function getGoodsPane({ availableStockItemDetailTypes, stockMovementType }) {
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
          <FieldArray
            name="boxes.details"
            label="Detalles Adicionales"
            component={AditionalStockDetailFields}
            availableDetailTypes={availableStockItemDetailTypes.filter(x => [
              'signOfHandling',
              'crashed',
              'damaged',
              'wet',
              'opened',
              'originalSeals',
              'resealed',
              'serialNumbers',
              'sealed',
              'unsealed'
            ].includes(x.code)).map(x => ({ key: x.id, value: x.id, text: x.description }))}
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
          <FieldArray
            name="palets.details"
            label="Detalles Adicionales"
            component={AditionalStockDetailFields}
            availableDetailTypes={availableStockItemDetailTypes.filter(x => [
              'signOfHandling',
              'damagedpallet',
              'wetpallet',
              'shrinkWrapped',
              'sealOverShrinkWrap',
              'hoopStrap'
          ].includes(x.code)).map(x => ({ key: x.id, value: x.id, text: x.description }))}
          />
        </Grid.Column>
      </Grid>
    </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
  }
  return (
    <div>

      { stockMovementType.code === 'receive' && <Field
        name="onHold"
        label="On Hold"
        component={renderCheckbox}
      /> }
      <Field
        name="quantity"
        type="text"
        label="Cantidad de Unidades"
        parse={parseToInt}
        component={renderField}
        required
      />
      <Tab
        panes={[boxesPane, paletsPane]}
        menu={{ secondary: true, pointing: true }}
        renderActiveOnly={false}
      />
    </div>
  )
}
