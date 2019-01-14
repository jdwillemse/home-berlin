import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ location }) => (
  <section className="view-container summary">
    <h1>Summary</h1>

    {location.state &&
      Object.keys(location.state).map(key => (
        <p key={key}>
          {key}: {location.state[key]}
        </p>
      ))}
  </section>
);

Summary.propTypes = {
  location: PropTypes.shape().isRequired
};

export default Summary;
