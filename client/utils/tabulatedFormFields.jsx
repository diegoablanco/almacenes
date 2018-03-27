import React from 'react'
import Grid from '../common/Grid'

export default function tabulatedFormFields(title, getFieldCells, additionalInformation) {
  function addHandler(fields) {
    return () => {
      fields.push({})
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
    return getFieldCells(title, fields, additionalInformation).map(fieldCell => ({
      property: fieldCell.property,
      cellFormatters: [getFieldCellFormatter(fieldCell.formatter)],
      label: fieldCell.label
    }))
  }
  return function ({ fields }) {
    return (
      <Grid
        canAdd
        enableAdd
        compact
        enableEdit={false}
        addHandler={addHandler(fields)}
        deleteHandler={fields.remove}
        columns={getColumns(fields)}
        rows={getRows(fields)}
      />
    )
  }
}
