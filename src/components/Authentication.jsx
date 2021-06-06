import React, { useState } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const Authentication = ({ setCommonState, url }) => {
  const [requestState, setRequestState] = useState('ready');
  const [errorMessage, setErrorMessage] = useState();

  const getErrorText = () => {
    const usernameError = errorMessage.username ? errorMessage.userName : '';
    const passwordError = errorMessage.password ? errorMessage.password : '';
    return `Authentication failed ${usernameError} ${passwordError}`;
  };

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
        <div className="mb-3">
          <label htmlFor="Login" className="col-sm-2 col-form-label">Login</label>
          <div className="col-sm-12">
            <input type="text" id="Login" className="form-control" name="username" required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" aria-label="password" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-12">
            <input type="password" id="Password" className="form-control" name="password" required />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit" disabled={requestState === 'requestInProgress'}>Sign in</button>
        </div>
      </form>
      <div className="mt-2 text-center font-weight-bold text-success">
        {requestState === 'success' ? <p>Successfuly authentication.</p> : null}
      </div>
      <div className="mt-2 text-center font-weight-bold text-danger">
        {requestState === 'wrongData' ? <p>{getErrorText()}</p> : null}
      </div>
      <div className="mt-2 text-center font-weight-bold text-danger">
        {requestState === 'failed' ? <p>Network error.</p> : null}
      </div>
      {JSON.stringify(PropTypes.func.isRequired)}
    </div>
  );
};

Authentication.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Authentication;
