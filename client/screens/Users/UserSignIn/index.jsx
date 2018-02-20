
import React from 'react'
import PropTypes from 'prop-types'
import { parse } from 'query-string'
import FormContainer from './FormContainer'

const Screen = ({ location, history }) => {
  const query = parse(location.search)
  return (
    <div>
      <FormContainer redirectTo={query.redirect} history={history} />
    </div>
  )
}

Screen.propTypes = {
  location: PropTypes.object
};

export default Screen;
