
import React from 'react'
import PropTypes from 'prop-types'
import { parse } from 'query-string'
import FormContainer from './FormContainer.js'

const Screen = (props) => {  
  const query = parse(location.search)
  return (
  <div>
    <FormContainer redirectTo={query.redirect} history={props.history}/>
  </div>
)}

Screen.propTypes = {
  location: PropTypes.object,
};

export default Screen;
