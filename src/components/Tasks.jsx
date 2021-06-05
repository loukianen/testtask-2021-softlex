import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const getStatusBadge = (status) => {
  switch (status) {
    case 1:
      return <span className="badge bg-danger">Edited by admin, not done</span>;
    case 10:
      return <span className="badge bg-success">Done</span>;
    case 11:
      return <span className="badge bg-success">Edited by admin, done</span>;
    default:
      return null;
  }
};

const Tasks = ({ commonState, setCommonState }) => {
  const { tasks, taskCount, tokenReceiptDate, tokenValidityPeriod } = commonState;

  const [requestState, setRequestState] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [sortBy, setSortBy] = useState();
  const [sortDirection, setSortDirection] = useState();
  const [page, setPage] = useState(1);

  const makeRequst = () => {
    const requestParams = {
      developer: 'Example',
      page,
      sort_field: sortBy,
      sort_direction: sortDirection,
    };

    $.ajax({
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
      crossDomain: true,
      method: 'GET',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: true,
      dataType: 'json',
      data: requestParams,
      success: (data) => {
        console.log(JSON.stringify(data));
        if (data.status === 'ok') {
          setCommonState({ tasks: data.message.tasks, taskCount: data.total_task_count });
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

  useEffect(() => makeRequst(), [sortBy, sortDirection, page]);

  function handleClickNewTask() {
    setCommonState({ currentComponent: 'newTask' });
  }

  const handleClickEdit = (taskId) => () => {
    setCommonState({ editedTaskId: taskId, currentComponent: 'editTask' });
  };

  const handleSortChange = (param) => () => {
    setSortBy(param);
  };

  const handleSortDirectionChange = (param) => () => {
    setSortDirection(param);
  };

  const getEditButton = (taskId) => (Date.now() - tokenReceiptDate < tokenValidityPeriod
    ? <div className="m-3 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={handleClickEdit(taskId)}
        >
          Edit
        </button>
      </div>
    : null);

  if (tasks === null) {
    return null;
  }

  return (
  <div className="d-flex flex-column">
    <div className="h3 text-center">Tasks list</div>
    <nav>
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle mx-1" type="button" id="sortByMenu" data-bs-toggle="dropdown" aria-expanded="false">
          Sort by
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortByMenu">
          <li className="dropdown-item" onClick={handleSortChange('id')}>Id</li>
          <li className="dropdown-item" onClick={handleSortChange('username')}>Username</li>
          <li className="dropdown-item" onClick={handleSortChange('email')}>Email</li>
          <li className="dropdown-item" onClick={handleSortChange('status')}>Status</li>
        </ul>
        <button className="btn btn-outline-secondary dropdown-toggle  mx-1" type="button" id="sortDirectionMenu" data-bs-toggle="dropdown" aria-expanded="false">
          Sort direction
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortDirectionMenu">
          <li className="dropdown-item" onClick={handleSortDirectionChange('asc')}>Asc</li>
          <li className="dropdown-item" onClick={handleSortDirectionChange('desc')}>Desc</li>
        </ul>
      </div>
    </nav>
    <div className="mt-3 ">
        {tasks.map(({ id, username, email, text, status }) => (
          <div className="text-center" key={id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                <div className="d-flex justify-content-end">{getStatusBadge(status)}</div>
                <p className="card-text">{text}</p>
                  {getEditButton(id)}
              </div>
            </div>
          </div>
        ))}
    </div>
    <div className="m-3 d-flex justify-content-end">
      <button type="button" className="btn btn-primary" onClick={handleClickNewTask}>Add new task</button>
    </div>
    <nav className="mt-3 d-flex justify-content-center" aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item active"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">...</a></li>
        <li className="page-item"><a className="page-link" href="#">17</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
  );
};

export default Tasks;
