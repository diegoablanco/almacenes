import React from 'react'
import { List, Label } from 'semantic-ui-react'

export default function (detail) {
  const items = Object.keys(detail).map((x, index) => (<div key={`${detail[x].qty}_${index}`}><Label content={detail[x].qty} circular color="black" /> {detail[x].description}</div>))
  return (
    <List items={items} />
  )
}
