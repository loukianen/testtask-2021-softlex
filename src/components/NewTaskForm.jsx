import React, { useState } from 'react';
import $ from 'jquery';

const NewTaskForm = ({ setCommonState, commonState }) => {
  const [requestState, setRequestState] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const getErrorText = () => {
    const usernameError = errorMessage.username ? errorMessage.userName : '';
    const passwordError = errorMessage.password ? errorMessage.password : '';
    const textError = errorMessage.password ? errorMessage.password : '';
    return `Task haven't saved ${usernameError} ${passwordError} ${textError}`;
  };

  function handleClickReturnToTasks() {
    setCommonState({ currentComponent: 'tasks' });
  }

  const handleSubmit = () => (e) => {
    e.preventDefault();
    setRequestState('requestInProgress');

    const form = new FormData(e.target);

    $.ajax({
      url: `${commonState.url}/create?developer=Lukyanenok`,
      crossDomain: true,
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false,
      data: form,
      dataType: 'json',
      success: (data) => {
        if (data.status === 'ok') {
          setCommonState({ tasks: [data.message], currentComponent: 'tasks' });
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
    <form className="g-3 needs-validation d-flex flex-column item-alite-center" onSubmit={handleSubmit()} novalidate>
      <div className="h3 text-center">New task</div>
      <div className="mb-2">
        <label htmlFor="validationCustom01" className="form-label">Username</label>
        <input type="text" className="form-control" id="validationCustom01" name="username" required />
        <div className="invalid-feedback">
          Fill this field, please!
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="validationCustom02" className="form-label">Email</label>
        <input type="email" className="form-control" id="validationCustom02" name="email" required />
        <div className="invalid-feedback">
          Fill this field, please!
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="validationCustomUsername" className="form-label">Text</label>
        <div className="input-group">
          <textarea className="form-control" rows="5" cols="20" id="validationText" name="text" aria-describedby="inputGroupPrepend" required />
          <div className="invalid-feedback">
            Fill this field, please!
          </div>
        </div>
      </div>
      <div className="mt-2 text-center font-weight-bold text-danger">
        {requestState === 'wrongData' ? <p>{getErrorText()}</p> : null}
      </div>
      <div className="mt-2 text-center font-weight-bold text-danger">
        {requestState === 'failed' ? <p>Network error.</p> : null}
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary m-1" type="button" onClick={handleClickReturnToTasks}>Return to tasks list</button>
        <button className="btn btn-primary m-1" type="submit" disabled={requestState === 'requestInProgress'}>Save</button>
      </div>
    </form>
  );
};

export default NewTaskForm;
