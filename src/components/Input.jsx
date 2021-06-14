import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  inputName,
  inputType,
  isDisabled = true,
  inputValue = null,
}) => (
  <div className="mb-2">
    <label htmlFor={`validation${inputName}`} className="form-label">{inputName}</label>
    <input
      type={inputType}
      className="form-control"
      value={inputValue}
      id={`validation${inputName}`}
      name={inputName.toLowerCase()}
      required
      disabled={isDisabled}
    />
  </div>
);

Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Input;
