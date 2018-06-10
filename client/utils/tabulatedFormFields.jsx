import React from 'react'
import Grid from '../common/Grid'

export default function tabulatedFormFields({ title, getFieldCells, crudPage, additionalInformation, onRowAdded }) {
  function addHandler(fields) {
    return () => {
      fields.push({})
      if (onRowAdded) onRowAdded(fields)
      return false
    }
  }
  function getRows(fields) {
    return fields.map((field, index) => ({ id: index, name: field }))
  }
  function getFieldCellFormatter(fieldCellFormatter) {
    return function (value, { rowData }) {
      return fieldCellFormatter(value, rowData, additionalInformation)
    }
  }
  function getColumns(fields) {
    return getFieldCells(title, fields, additionalInformation).map(({ property, formatter, label, props }) => ({
      property,
      cellFormatters: [getFieldCellFormatter(formatter)],
      label,
      props
    }))
  }
  return function ({ fields }) {
    return (
      <Grid
        canAdd
        enableAdd
        compact
        crudPage={crudPage}
        enableEdit={false}
        addHandler={addHandler(fields)}
        removeHandler={fields.remove}
        columns={getColumns(fields)}
        rows={getRows(fields)}
      />
    )
  }
}
