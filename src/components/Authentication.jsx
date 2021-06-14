import React, { useState } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Input from './Input.jsx';
import FeedbackRenderer from './FeedbackRenderer.jsx';
import { getErrorText } from '../utils';

const Authentication = ({ setCommonState, url }) => {
  const [requestState, setRequestState] = useState('ready');
  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = () => (e) => {
    e.preventDefault();
    setRequestState('requestInProgress');

    const formData = new FormData(e.target);
    $('input').val('');

    $.ajax({
      url: `${url}/login?developer=Lukyanenok`,
      crossDomain: true,
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false,
      data: formData,
      dataType: 'json',
      success: (data) => {
        if (data.status === 'ok') {
          const { token } = data.message;
          setCommonState({ token, tokenReceiptDate: Date.now() });
          setRequestState('success');
        } else {
          setErrorMessage(data.message);
          setRequestState('wrongData');
        }
      },
      error: () => {
        setRequestState('failed');
      },
    });
  };

  return (
    <div className="text-centre">
      <div className="h3 mb-3 text-center">Authentication</div>
      <form onSubmit={handleSubmit()}>
        <Input inputName="Username" inputType="text" isDisabled={false} />
        <Input inputName="Password" inputType="password" isDisabled={false} />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit" disabled={requestState === 'requestInProgress'}>Sign in</button>
        </div>
      </form>
      <FeedbackRenderer requestState={requestState} errorText={getErrorText(errorMessage, 'Authentication failed')} />
    </div>
  );
};

Authentication.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Authentication;
