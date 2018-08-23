import React from 'react'
import { Field } from 'redux-form'
import { renderLabel2 } from '../../../utils/formHelpers'

export default function () {
  return [
    {
      property: 'reference',
      label: 'Referencia',
      props: {
        style: {
          width: 500
        }
      },
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.reference`}
        component={renderLabel2}
        label=""
      />)
    },
    {
      property: 'quantity',
      label: 'Cantidad',
      props: {
        style: {
          width: 150
        }
      },
      formatter(value, { name: fieldName }) {
        return (<Field
          name={`${fieldName}.quantity`}
          component={renderLabel2}
          label=""
        />)
      }
    }
  ]
}
