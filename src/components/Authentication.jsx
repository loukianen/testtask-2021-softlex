import React, { useState } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Input from './Input.jsx';
import FeedbackRenderer from './FeedbackRenderer.jsx';
import SingleButton from './SingleButton.jsx';
import { getErrorText, clearTokenData } from '../utils';

const setToken = (userName, token) => {
  localStorage.setItem('softlexToDoToken', token);
  localStorage.setItem('softlexToDoTokenDate', Date.now());
  localStorage.setItem('softlexToDoTokenUsername', userName);
};

const Authentication = ({ setCommonState, url, auth }) => {
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
          setToken(formData.get('username'), token);
          setCommonState({ authentication: 'authenticated' });
          setRequestState('success');
        } else {
          setErrorMessage(data.message);
          setRequestState('wrongData');
          setCommonState({ authentication: 'notAuthenticated' });
        }
      },
      error: () => {
        setRequestState('failed');
      },
    });
  };

  const handleSignOut = () => {
    clearTokenData();
    setCommonState({ authentication: 'notAuthenticated' });
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit()}>
      <Input inputName="Username" inputType="text" isDisabled={false} />
      <Input inputName="Password" inputType="password" isDisabled={false} />
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" type="submit" disabled={requestState === 'requestInProgress'}>Sign in</button>
      </div>
    </form>
  );

  const renderSignOutButton = () => {
    const username = localStorage.getItem('softlexToDoTokenUsername');
    const authMessage = `You have authenticated as '${username}'`;
    return (
      <div className="text-center">
        <p>{authMessage}</p>
        <SingleButton handler={handleSignOut} text="Sign out" />
      </div>
    );
  };

  return (
    <div className="text-centre">
      <div className="h3 mb-3 text-center">Authentication</div>
      {auth === 'authenticated' ? renderSignOutButton() : renderForm()}
      <FeedbackRenderer requestState={requestState} errorText={getErrorText(errorMessage, 'Authentication failed')} />
    </div>
  );
};

Authentication.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
};

export default Authentication;
