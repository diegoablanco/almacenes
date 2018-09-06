import React from 'react'
import { Field } from 'redux-form'
import { renderLabel2 } from '../../../utils/formHelpers'

export default function () {
  return [
    {
      property: 'type.category.description',
      label: 'Categoría',
      props: {
        style: {
          width: 300
        }
      },
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.type.category.description`}
        component={renderLabel2}
        label=""
      />)
    },
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
          component={renderLabel2}
          label=""
        />)
      }
    },
    {
      property: 'code',
      label: 'Código',
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.code`}
        component={renderLabel2}
        label=""
      />)
    },
    {
      property: 'price',
      label: 'Precio',
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.price`}
        component={renderLabel2}
        label=""
      />)
    }
  ]
}
