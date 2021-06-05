import React, { useState } from 'react';
import $ from 'jquery';

const isEven = (num) => num % 2 === 0;

const EditTaskForm = ({ commonState, setCommonState}) => {
  const { tasks, editedTaskId, token, tokenReceiptDate, tokenValidityPeriod, url } = commonState;
  const {
    id,
    username,
    email,
    text,
    status,
  } = tasks.filter(({ id: taskId }) => taskId === editedTaskId)[0];

  const [requestState, setRequestState] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [currentText, setCurrentText] = useState(text);
  const [currentDoneStatus, setCurrentDoneStatus] = useState(status >= 10);

  const getErrorText = () => {
    const textError = errorMessage.password ? errorMessage.password : '';
    const tokenError = errorMessage.token ? errorMessage.token : '';
    const idError = errorMessage.id ? errorMessage.id : '';
    return `Task haven't saved. ${textError} ${tokenError} ${idError}`;
  };

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

  const handleSubmit = () => (e) => {
    e.preventDefault();
    setRequestState('requestInProgress');

    if (Date.now() - tokenReceiptDate > tokenValidityPeriod) {
      setErrorMessage({
        token: 'Authentication period have been finished. Please, refresh your authentication'
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
      success: (data) => {
        if (data.status === 'ok') {
          const editedTasks = tasks.map((task) => {
            if (task.id === id) {
              return { ...task, text: currentText, status: newStatus };
            }
            return task;
          });
          setCommonState({ tasks: editedTasks, currentComponent: 'tasks' });
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
      <div className="h3 text-center">Edit task</div>
      <div className="mb-2">
        <label htmlFor="validationCustom01" className="form-label">Username</label>
        <input type="text" className="form-control" id="validationCustom01" value={username} disabled />
        <div className="invalid-feedback">
          Fill this field, please!
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="validationCustom02" className="form-label">Email</label>
        <input type="email" className="form-control" id="validationCustom02" value={email} disabled />
        <div className="invalid-feedback">
          Fill this field, please!
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="validationCustomUsername" className="form-label">Text</label>
        <div className="input-group">
          <textarea className="form-control" rows="5" cols="20" value={currentText} id="validationText" aria-describedby="inputGroupPrepend" onChange={handleChangeText()} required />
          <div className="invalid-feedback">
            Fill this field, please!
          </div>
        </div>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleChangeStatus()} checked={currentDoneStatus}/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Done
        </label>
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

export default EditTaskForm;
