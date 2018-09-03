import React from 'react'
import { Field } from 'redux-form'
import { renderLabel2, renderField, parseToInt } from '../../../utils/formHelpers'
import tabulatedFormFields from '../../../utils/tabulatedFormFields'

function referencesFieldCells(title, fields, { enableRelease, enableIssue }) {
  const columns = [
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
  if (enableRelease) {
    columns.push({
      property: 'quantity',
      label: 'Cantidad a liberar',
      props: {
        style: {
          width: 150
        }
      },
      formatter(value, { name: fieldName }) {
        return (<Field
          name={`${fieldName}.releaseQuantity`}
          component={renderField}
          parse={parseToInt}
          label=""
        />)
      }
    })
  }
  if (enableIssue) {
    columns.push({
      property: 'quantity',
      label: 'Cantidad a entregar',
      props: {
        style: {
          width: 150
        }
      },
      formatter(value, { name: fieldName }) {
        return (<Field
          name={`${fieldName}.issueQuantity`}
          component={renderField}
          parse={parseToInt}
          label=""
        />)
      }
    })
  }
  return columns
}
export default tabulatedFormFields({
  title: 'Referencias',
  getFieldCells: referencesFieldCells,
  crudPage: 'addReference',
  enableAdd: false
})
