import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';

const Signup = ({ history }) => (
  <section className="view-container">
    <Form {...{ history }} />
  </section>
);

Signup.propTypes = {
  history: PropTypes.shape().isRequired
};

export default Signup;
