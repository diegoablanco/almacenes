import React from 'react'
import { Field } from 'redux-form'
import { renderField, renderSelect } from '../utils/formHelpers'

export function getPhoneFieldCells(title, phone, options = []) {
  return [
    {
      property: 'number',
      label: 'Número',
      formatter(value, { name: phone }) {
        return (<Field
          name={`${phone}.number`}
          iconPosition="left"
          component={renderField}
        />)
      }
    },
    {
      property: 'typeId',
      label: 'Tipo',
      formatter: (value, { name: phone }) => (<Field
        name={`${phone}.typeId`}
        iconPosition="left"
        component={renderSelect}
        options={options.map(option => ({
          key: option.id,
          value: option.id,
          text: option.description
        }))}
      />)
    }
  ]
}