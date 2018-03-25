import React from 'react'
import { Message } from 'semantic-ui-react'

export default function (errors) {
  function getErrorText({ property, message }) {
    return <div><b>{property}</b>: {message}</div>
  }
  return (
    <div>
      { errors && errors.length > 1 && <Message
        error
        list={errors.map(getErrorText)}
        header="Ocurrieron los siguientes errores de validación:"
      /> }
      { errors && errors.length === 1 && <Message
        error
        header="Ocurrió el siguiente error de validación:"
        content={getErrorText(errors[0])}
      /> }
    </div>
  )
}
