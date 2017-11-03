
import React from 'react'
import PropTypes from 'prop-types'
import Container from './Container'

const Page = (props) => (
  <div>
    <Container emailToken={props.match.params.token} />
  </div>
)

export default Page
