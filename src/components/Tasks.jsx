import React from 'react';

const getStatusHtml = (status) => {
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
  const { tasks, token } = commonState;
  function handleClickNewTask() {
    setCommonState({ currentComponent: 'newTask' });
  }

  const handleClickEdit = (taskId) => () => {
    console.log(taskId);
    setCommonState({ editedTaskId: taskId, currentComponent: 'editTask' });
  };

  const getEditButton = (taskId) => (token !== null
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

  if (tasks.length === 0) {
    return null;
  }

  return (
  <div className="d-flex flex-column">
    {JSON.stringify(tasks)}
    <div className="h3 text-center">Tasks list</div>
    <nav>
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle mx-1" type="button" id="sortByMenu" data-bs-toggle="dropdown" aria-expanded="false">
          Sort by
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortByMenu">
          <li className="dropdown-item">Id</li>
          <li className="dropdown-item">Username</li>
          <li className="dropdown-item">Email</li>
          <li className="dropdown-item">Status</li>
        </ul>
        <button className="btn btn-outline-secondary dropdown-toggle  mx-1" type="button" id="sortDirectionMenu" data-bs-toggle="dropdown" aria-expanded="false">
          Sort direction
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortDirectionMenu">
          <li className="dropdown-item">Asc</li>
          <li className="dropdown-item">Desc</li>
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
                <div className="d-flex justify-content-end">{getStatusHtml(status)}</div>
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
