import React from 'react'
import FormModal from '../../common/FormModal'
import WarehouseForm, { formName } from './WarehouseFormContainer'

const WarehouseFormModal = ({ id, ...rest }) => (
  <FormModal
    title={id ? 'Editar Almacén' : 'Agregar Almacén'}
    form={WarehouseForm}
    formName={formName}
    id={id}
    {...rest}
  />)

export default WarehouseFormModal
