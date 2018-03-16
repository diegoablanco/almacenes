import React from 'react'
import { Field } from 'redux-form'
import { renderField, SelectOrLabel } from '../../../utils/formHelpers'

export default function (setServiceRate) {
  return function (title, fields, availableServices = []) {
    function handleDetailSelect(index, serviceId) {
      setServiceRate(index, availableServices.find(x => x.id === serviceId).rate)
    }
    return [
      {
        property: 'serviceId',
        label: 'Servicio',
        formatter: (value, { id: index, name }) => (<Field
          name={`${name}.serviceId`}
          component={SelectOrLabel}
          onChange={(e, serviceId) => handleDetailSelect(index, serviceId)}
          options={availableServices.map(option => ({
              key: option.id,
              value: option.id,
              text: option.description
            }))}
        />)
        // <Field
        //   name={`${name}.description`}
        //   component={renderField}
        // />
      },
      {
        property: 'rate',
        label: 'Tarifa',
        formatter: (value, { name }) => (<Field
          name={`${name}.rate`}
          component={renderField}
        />)
      }
    ]
  }
}
