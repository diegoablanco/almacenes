
import React, { PropTypes } from 'react';
import { parse } from 'query-string';
import FormContainer from './FormContainer.js';
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
