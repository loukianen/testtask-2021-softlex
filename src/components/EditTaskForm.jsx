import React, { useState } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Input from './Input.jsx';
import ButtonsBlock from './ButtonsBlock.jsx';
import FeedbackRenderer from './FeedbackRenderer.jsx';
import { getErrorText } from '../utils';

const isEven = (num) => num % 2 === 0;

const EditTaskForm = ({
  tasks,
  editedTaskId,
  token,
  tokenReceiptDate,
  tokenValidityPeriod,
  url,
  setCommonState,
}) => {
  const {
    id,
    username,
    email,
    text,
    status,
  } = tasks.filter(({ id: taskId }) => taskId === editedTaskId)[0];

  const [requestState, setRequestState] = useState();
  const [errorMessage, setErrorMessage] = useState({});
  const [currentText, setCurrentText] = useState(text);
  const [currentDoneStatus, setCurrentDoneStatus] = useState(status >= 10);
  const isTokenValid = Date.now() - tokenReceiptDate < tokenValidityPeriod;

  const getStatus = () => {
    const isTaskEdited = !isEven(status) || text !== currentText;
    return currentDoneStatus * 10 + isTaskEdited;
  };

  function handleClickReturnToTasks() {
    setCommonState({ currentComponent: 'tasks' });
  }

  const handleChangeText = () => (e) => {
    setCurrentText(e.target.value);
  };

  const handleChangeStatus = () => (e) => {
    setCurrentDoneStatus(e.target.checked);
  };

  const handleSuccessfulResponse = (data, newStatus) => {
    if (data.status === 'ok') {
      const editedTasks = tasks.map((task) => (task.id === id
        ? { ...task, text: currentText, status: newStatus }
        : task));
      setCommonState({ tasks: editedTasks, currentComponent: 'tasks' });
    } else {
      setErrorMessage(data.message);
      setRequestState('wrongData');
    }
  };

  const handleSubmit = () => (e) => {
    e.preventDefault();
    setRequestState('requestInProgress');

    if (!isTokenValid) {
      setErrorMessage({
        token: 'Authentication period have been finished. Please, refresh your authentication',
      });
      setRequestState('wrongData');
      return;
    }

    const newStatus = getStatus();

    const form = new FormData();
    form.append('token', token);
    form.append('status', newStatus);
    form.append('text', currentText);

    $.ajax({
      url: `${url}/edit/${id}?developer=Lukyanenok`,
      crossDomain: true,
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false,
      data: form,
      dataType: 'json',
      success: (data) => handleSuccessfulResponse(data, newStatus),
      error: () => setRequestState('failed'),
    });
  };

  return (
    /* eslint-disable react/no-unknown-property */
    <form className="g-3 needs-validation d-flex flex-column item-alite-center" onSubmit={handleSubmit()} novalidate>
      <div className="h3 text-center">Edit task</div>
      <Input inputName="Username" inputType="text" inputValue={username} />
      <Input inputName="Email" inputType="email" inputValue={email} />
      <div className="mb-2">
        <label htmlFor="validationCustomUsername" className="form-label">Text</label>
        <div className="input-group">
          <textarea className="form-control" rows="5" cols="20" value={currentText} id="validationText" aria-describedby="inputGroupPrepend" onChange={handleChangeText()} required />
        </div>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleChangeStatus()} checked={currentDoneStatus} />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Done
        </label>
      </div>
      <FeedbackRenderer requestState={requestState} errorText={getErrorText(errorMessage, "Task haven't saved")} />
      <ButtonsBlock handler={handleClickReturnToTasks} isDisabled={requestState === 'requestInProgress'} />
    </form>
  );
};

EditTaskForm.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  editedTaskId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  tokenReceiptDate: PropTypes.number.isRequired,
  tokenValidityPeriod: PropTypes.number.isRequired,
};

export default EditTaskForm;
