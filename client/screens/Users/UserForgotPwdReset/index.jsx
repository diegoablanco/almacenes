
import React from 'react'
import PropTypes from 'prop-types'
import FormContainer from './FormContainer'

const Page = (props) => (
  <div>
    <FormContainer resetToken={props.match.params.token} />
  </div>
);

Page.propTypes = {
  params: PropTypes.object.isRequired
};

export default Page;
