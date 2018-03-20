import React from 'react'
import { Message } from 'semantic-ui-react'

export default function (error) {
  return (<div>
    { error && <Message
        error
        list={Array.isArray(error) && error} 
        header="Ocurrieron los siguientes errores de validación:">
        {!Array.isArray(error) && error}
      </Message> }
  </div>
  )
}
