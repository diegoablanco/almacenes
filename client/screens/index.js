import React from 'react';
import PropTypes from 'prop-types';

const AppWrapper = (props) => (
  <div>
    {props.children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.any,
};

export default AppWrapper;
