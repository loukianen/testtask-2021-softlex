import React from 'react';
import PropTypes from 'prop-types';

const SinglButton = ({ handler, text }) => (
  <div className="m-2 d-flex justify-content-end">
    <button className="btn btn-primary" type="button" onClick={handler}>{text}</button>
  </div>
);

SinglButton.propTypes = {
  handler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default SinglButton;
