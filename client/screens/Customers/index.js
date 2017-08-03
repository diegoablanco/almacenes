import React, { PropTypes } from 'react';
import ListContainer from './ListContainer.js';
const Screen = (props) => {  
  return (
  <div>
    <ListContainer history={props.history}/>
  </div>
)}

export default Screen;