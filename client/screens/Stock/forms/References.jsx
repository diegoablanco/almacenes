import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { renderCheckbox } from '../../../utils/formHelpers'
import ReferenceForm from '../components/ReferenceForm'
import ReferencesFields from '../components/ReferencesFields'

export default function getGoodsPane({
  stockMovementType,
  addReference }) {
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
        component={ReferencesFields}
      />
    </div>
  )
}
