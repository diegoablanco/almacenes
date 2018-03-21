import React from 'react'
import { Message } from 'semantic-ui-react'

export default function (error) {
  return (<div>
    { error && error.length > 1 && <Message
        error
        list={Array.isArray(error) && error} 
        header="Ocurrieron los siguientes errores de validación:" /> }
      { error && error.length === 1 && <Message
        error
        header="Ocurrió el siguiente error de validación:"
        content={error} /> }
  </div>
  )
}
