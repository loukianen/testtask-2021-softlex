import React from 'react';
import PropTypes from 'prop-types';

const FeedbackRenderer = ({ requestState, errorText = '' }) => {
  const mapping = {
    ready: null,
    success: 'Successfuly authentication',
    failed: 'Network error',
    wrongData: errorText,
  };
  const messageColour = requestState === 'success' ? 'success' : 'danger';
  if (mapping[requestState]) {
    return (
      <div className={`mt-2 text-center font-weight-bold text-${messageColour}`}>
        <p>{mapping[requestState]}</p>
      </div>
    );
  }
  return null;
};

FeedbackRenderer.propTypes = {
  requestState: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
};

export default FeedbackRenderer;
