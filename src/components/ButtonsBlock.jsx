import React from 'react';
import PropTypes from 'prop-types';

const ButtonsBlock = ({
  handler,
  isDisabled = false,
}) => (
  <div className="d-flex justify-content-end">
    <button className="btn btn-primary m-1" type="button" onClick={handler}>Return to tasks list</button>
    <button className="btn btn-primary m-1" type="submit" disabled={isDisabled}>Save</button>
  </div>
);

ButtonsBlock.propTypes = {
  handler: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default ButtonsBlock;
