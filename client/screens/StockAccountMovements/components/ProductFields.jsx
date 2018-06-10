import React from 'react'
import { Field } from 'redux-form'
import { renderField, renderLabel2 } from '../../../utils/formHelpers'

export default function () {
  return [
    {
      property: 'description',
      label: 'Descripción',
      props: {
        style: {
          width: 300
        }
      },
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.type.description`}
        component={renderLabel2}
        label=""
      />)
    },
    {
      property: 'ean',
      label: 'EAN',
      props: {
        style: {
          width: 300
        }
      },
      formatter(value, { name: fieldName }) {
        return (<Field
          name={`${fieldName}.type.ean`}
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
