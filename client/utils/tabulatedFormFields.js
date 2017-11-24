import React, { Component } from 'react'
import Grid from '../common/Grid'

export default function tabulatedFormFields(title, getFieldCells, additionalInformation){
    function addHandler(fields){
        return () => {
            fields.push({})
            return false
        }
    }
    function getRows(fields){
        return fields.map((field, index) => {
            return {id: index, name: field}
        })
    }
    function getColumns(fields){
        return getFieldCells(title, fields, additionalInformation).map((fieldCell, index) => ({
            property: fieldCell.property,
            cellFormatters: [(value, {rowData}) => fieldCell.formatter(value, rowData, additionalInformation)],
            label: fieldCell.label            
        }))
    }
    return ({ fields, meta: { error, submitFailed } }) => (      
        <Grid 
            canAdd={true}
            enableAdd={true}
            enableEdit={false}
            addHandler={addHandler(fields)}
            deleteHandler={(index) => fields.remove(index)}
            columns={getColumns(fields)} 
            rows={getRows(fields)}
        /> 
    )
}