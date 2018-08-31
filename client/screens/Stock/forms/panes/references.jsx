import React from 'react'
import { Tab } from 'semantic-ui-react'
import ReferencesPane from '../References'

export default (props) => {
  const {
    addReference,
    extras: { stockMovementType }
  } = props
  return {
    menuItem: 'Referencias',
    pane: <Tab.Pane attached={false} key="references">
      <ReferencesPane {...{ stockMovementType, addReference }} />
    </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
  }
}
