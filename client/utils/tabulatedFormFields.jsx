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
  function getColumns(fields) {
    return getFieldCells(title, fields, additionalInformation).map(fieldCell => ({
      property: fieldCell.property,
      cellFormatters: [(value, { rowData }) => fieldCell.formatter(value, rowData, additionalInformation)],
      label: fieldCell.label
    }))
  }
  return ({ fields }) => (
    <Grid
      canAdd
      enableAdd
      enableEdit={false}
      addHandler={addHandler(fields)}
      deleteHandler={fields.remove}
      columns={getColumns(fields)}
      rows={getRows(fields)}
    />
  )
}
