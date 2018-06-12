import React from 'react'
import { List } from 'semantic-ui-react'

export default function (detail) {
  const items = Object.keys(detail).map(x => `${detail[x].qty} ${detail[x].description}`)
  return (
    <List items={items} />
  )
}
