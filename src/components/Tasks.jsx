import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const Tasks = ({
  tasks,
  taskCount,
  tokenReceiptDate,
  tokenValidityPeriod,
  tasksOnPage,
  url,
  page,
  setCommonState,
}) => {
  const isTokenValid = Date.now() - tokenReceiptDate < tokenValidityPeriod;

  const [requestState, setRequestState] = useState();
  const [sortBy, setSortBy] = useState();
  const [sortDirection, setSortDirection] = useState();
  const totalPages = Math.ceil(taskCount / tasksOnPage);

  const makeRequest = () => {
    const requestParams = {
      developer: 'Lukyanenok',
      page,
      sort_field: sortBy,
      sort_direction: sortDirection,
    };

    $.ajax({
      url: `${url}/`,
      crossDomain: true,
      method: 'GET',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: true,
      dataType: 'json',
      data: requestParams,
      success: (data) => {
        if (data.status === 'ok') {
          setCommonState({ tasks: data.message.tasks, taskCount: data.message.total_task_count });
        } else {
          setRequestState('wrongData');
        }
      },
      error: () => {
        setRequestState('failed');
      },
    });
  };

  useEffect(() => makeRequest(), [sortBy, sortDirection, page, requestState]);

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

  const handlePageClick = (param) => (e) => {
    e.preventDefault();
    let newPage;
    switch (param) {
      case 'prev':
        newPage = page <= 1 ? 1 : page - 1;
        break;
      case 'next':
        newPage = page >= totalPages ? totalPages : page + 1;
        break;
      default:
        newPage = param;
    }
    setCommonState({ page: newPage });
  };

  const getPaginationData = () => {
    let numbersPage = [page - 1, page, page + 1, '...', totalPages];
    if (page === 1) {
      numbersPage = [1, 2, 3, '...', totalPages];
    }
    if (totalPages - page <= 1) {
      numbersPage = [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    if (totalPages < 5) {
      numbersPage = Array(totalPages).fill(1).map((el, i) => el + i);
    }
    return numbersPage;
  };

  const renderErrors = () => (
    <div>
      <div className="mt-2 text-center font-weight-bold text-danger">
        {requestState === 'wrongData' ? <p>Wrong data have been received</p> : null}
      </div>
      <div className="mt-2 text-center font-weight-bold text-danger">
        {requestState === 'failed' ? <p>Network error.</p> : null}
      </div>
    </div>
  );

  const paginationData = getPaginationData();

  return (
    <div className="d-flex flex-column">
      <div className="h3 text-center">Tasks list</div>
      <nav>
        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle mx-1" type="button" id="sortByMenu" data-bs-toggle="dropdown" aria-expanded="false">
            Sort by
          </button>
          <ul className="dropdown-menu" aria-labelledby="sortByMenu">
            <li><button type="button" className="dropdown-item" onClick={handleSortChange('id')}>Id</button></li>
            <li><button type="button" className="dropdown-item" onClick={handleSortChange('username')}>Username</button></li>
            <li><button type="button" className="dropdown-item" onClick={handleSortChange('email')}>Email</button></li>
            <li><button type="button" className="dropdown-item" onClick={handleSortChange('status')}>Status</button></li>
          </ul>
          <button className="btn btn-outline-secondary dropdown-toggle  mx-1" type="button" id="sortDirectionMenu" data-bs-toggle="dropdown" aria-expanded="false">
            Sort direction
          </button>
          <ul className="dropdown-menu" aria-labelledby="sortDirectionMenu">
            <li><button type="button" className="dropdown-item" onClick={handleSortDirectionChange('asc')}>Asc</button></li>
            <li><button type="button" className="dropdown-item" onClick={handleSortDirectionChange('desc')}>Desc</button></li>
          </ul>
        </div>
      </nav>
      <div className="mt-3 ">
        {tasks.map(({
          id,
          username,
          email,
          text,
          status,
        }) => (
          <div className="text-center" key={id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                <div className="d-flex justify-content-end">{getStatusBadge(status)}</div>
                <p className="card-text">{text}</p>
                {isTokenValid
                  ? (
                    <div className="m-3 d-flex justify-content-end">
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleClickEdit(id ?? id)}>
                        Edit
                      </button>
                    </div>
                  )
                  : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-3 d-flex justify-content-end">
        <button type="button" className="btn btn-primary" onClick={handleClickNewTask}>Add new task</button>
      </div>
      {renderErrors()}
      <nav className="mt-3 d-flex justify-content-center" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item"><button type="button" className="page-link" onClick={handlePageClick('prev')}>Previous</button></li>
          {paginationData.map((item) => {
            const itemClasses = item === page ? 'page-item active' : 'page-item';
            return <li key={item} className={itemClasses}><button type="button" className="page-link" onClick={handlePageClick(item)}>{item}</button></li>;
          })}
          <li className="page-item"><button type="button" className="page-link" onClick={handlePageClick('next')}>Next</button></li>
        </ul>
      </nav>
    </div>
  );
};

Tasks.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokenReceiptDate: PropTypes.number.isRequired,
  tokenValidityPeriod: PropTypes.number.isRequired,
  taskCount: PropTypes.number.isRequired,
  tasksOnPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default Tasks;
