import React, { useState } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Input from './Input.jsx';
import ButtonsBlock from './ButtonsBlock.jsx';
import FeedbackRenderer from './FeedbackRenderer.jsx';
import { getErrorText } from '../utils';

const NewTaskForm = ({ setCommonState, url }) => {
  const [requestState, setRequestState] = useState();
  const [errorMessage, setErrorMessage] = useState({});

  function handleClickReturnToTasks() {
    setCommonState({ currentComponent: 'tasks' });
  }

  const handleSubmit = () => (e) => {
    e.preventDefault();
    setRequestState('requestInProgress');

    const form = new FormData(e.target);

    $.ajax({
      url: `${url}/create?developer=Lukyanenok`,
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
    /* eslint-disable react/no-unknown-property */
    <form className="g-3 needs-validation d-flex flex-column item-alite-center" onSubmit={handleSubmit()} novalidate>
      <div className="h3 text-center">New task</div>
      <Input inputName="Username" inputType="text" isDisabled={false} />
      <Input inputName="Email" inputType="email" isDisabled={false} />
      <div className="mb-2">
        <label htmlFor="validationCustomUsername" className="form-label">Text</label>
        <div className="input-group">
          <textarea className="form-control" rows="5" cols="20" id="validationText" name="text" aria-describedby="inputGroupPrepend" required />
          <div className="invalid-feedback">
            Fill this field, please!
          </div>
        </div>
      </div>
      <FeedbackRenderer requestState={requestState} errorText={getErrorText(errorMessage, "Task haven't saved")} />
      <ButtonsBlock handler={handleClickReturnToTasks} isDisabled={requestState === 'requestInProgress'} />
    </form>
  );
};

NewTaskForm.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default NewTaskForm;
