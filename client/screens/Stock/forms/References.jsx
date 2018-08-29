import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { renderCheckbox } from '../../../utils/formHelpers'
import tabulatedFormFields from '../../../utils/tabulatedFormFields'
import ReferenceForm from '../components/ReferenceForm'
import ReferencesFields from '../components/ReferencesFields'

export default function getGoodsPane({
  stockMovementType,
  addReference }) {
  const referenceFields = tabulatedFormFields({
    title: 'Referencias',
    getFieldCells: ReferencesFields,
    crudPage: 'addReference',
    enableAdd: false
  })
  return (
    <div>
      { stockMovementType.code === 'receive' && <Field
        name="onHold"
        label="On Hold"
        component={renderCheckbox}
      /> }
      <ReferenceForm {...{ addReference }} />
      <FieldArray
        name="references"
        component={referenceFields}
      />
    </div>
  )
}
