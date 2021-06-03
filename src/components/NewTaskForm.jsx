// @ts-check

import React from 'react';

const eddedTask = {
  status: 'ok',
  message: {
    id: 8,
    username: 'Example user',
    email: '123@example.com',
    text: 'Some text',
    status: 0,
  },
};

const NewTaskForm = ({ changeState }) => {
  function handleClickReturnToTasks() {
    changeState({ currentComponent: 'tasks' });
  }

  return (
    <form className="g-3 needs-validation d-flex flex-column item-alite-center" noValidate>
      <div className="h3 text-center">New task</div>
      <div className="mb-2">
        <label htmlFor="validationCustom01" className="form-label">Username</label>
        <input type="text" className="form-control" id="validationCustom01" required />
        <div className="invalid-feedback">
          Fill this field, please!
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="validationCustom02" className="form-label">Email</label>
        <input type="email" className="form-control" id="validationCustom02" required />
        <div className="invalid-feedback">
          Fill this field, please!
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="validationCustomUsername" className="form-label">Text</label>
        <div className="input-group">
          <textarea className="form-control" rows="5" cols="20" id="validationText" aria-describedby="inputGroupPrepend" required />
          <div className="invalid-feedback">
            Fill this field, please!
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary m-1" type="button" onClick={handleClickReturnToTasks}>Return to tasks list</button>
        <button className="btn btn-primary m-1" type="submit">Save</button>
      </div>
    </form>
  );
};

export default NewTaskForm;
