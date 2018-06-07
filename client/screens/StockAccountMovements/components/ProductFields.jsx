import React from 'react'
import { Field } from 'redux-form'
import { renderField } from '../../../utils/formHelpers'

export default function () {
  return [
    {
      property: 'ean',
      label: 'EAN',
      formatter(value, { name: fieldName }) {
        return (<Field
          name={`${fieldName}.ean`}
          component={renderField}
          label=""
        />)
      }
    },
    {
      property: 'code',
      label: 'Código',
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.code`}
        component={renderField}
        label=""
      />)
    }
  ]
}
