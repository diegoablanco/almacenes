import React from 'react'
import { List, Label } from 'semantic-ui-react'

export default function (references) {
  const items = references.map(({id, quantity, reference}, index) => 
    (<div key={id}>
      <Label content={quantity} circular color="black" /> {reference}
    </div>))
  return (
    <List items={items} />
  )
}
