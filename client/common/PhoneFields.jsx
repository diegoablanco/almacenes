import React from 'react'
import { Field } from 'redux-form'
import { renderField, renderSelect } from '../utils/formHelpers'

export function getPhoneFieldCells(title, phone, { phoneTypes = []}) {
  return [
    {
      property: 'number',
      label: 'Número',
      formatter(value, { name: fieldName }) {
        return (<Field
          name={`${fieldName}.number`}
          iconPosition="left"
          component={renderField}
          label=""
        />)
      }
    },
    {
      property: 'typeId',
      label: 'Tipo',
      formatter: (value, { name: fieldName }) => (<Field
        name={`${fieldName}.typeId`}
        iconPosition="left"
        component={renderSelect}
        label=""
        options={phoneTypes.map(option => ({
          key: option.id,
          value: option.id,
          text: option.description
        }))}
      />)
    }
  ]
}
