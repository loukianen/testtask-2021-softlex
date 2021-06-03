import React from 'react';

const EditTaskForm = ({ tasks, editedTaskId, changeState}) => {
  function handleClickReturnToTasks() {
    changeState({ currentComponent: 'tasks' });
  }

  const {
    id,
    username,
    email,
    text,
    status,
  } = tasks.filter(({ id }) => id === editedTaskId)[0];
  return (
    <form className="g-3 needs-validation d-flex flex-column item-alite-center" noValidate>
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
          <textarea className="form-control" rows="5" cols="20" value={text} id="validationText" aria-describedby="inputGroupPrepend" required />
          <div className="invalid-feedback">
            Fill this field, please!
          </div>
        </div>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Done
        </label>
      </div>
      <div className="d-flex justify-content-end">
      <button className="btn btn-primary m-1" type="button" onClick={handleClickReturnToTasks}>Return to tasks list</button>
        <button className="btn btn-primary m-1" type="submit">Save</button>
      </div>
    </form>
  );
};

export default EditTaskForm;
