import React from 'react';
import Tasks from './Tasks.jsx';
import NewTaskForm from './NewTaskForm.jsx';
import EditTaskForm from './EditTaskForm.jsx';
import Authentication from './Authentication.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      tokenReceiptDate: null,
      tokenValidityPeriod: 1000 * 60 * 60 * 24, // period 24 hours (in milliseconds)
      tasksOnPage: 3,
      page: 1,
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2',
      currentComponent: 'tasks',
      editedTaskId: null,
      tasks: [],
      taskCount: 0,
    };
  }

  setCommonState() {
    return this.setState.bind(this);
  }

  getConponent() {
    const {
      token,
      tokenReceiptDate,
      tokenValidityPeriod,
      tasksOnPage,
      page,
      url,
      currentComponent,
      editedTaskId,
      tasks,
      taskCount,
    } = this.state;
    const mapping = {
      tasks: <Tasks
        setCommonState={this.setCommonState()}
        tasks={tasks}
        taskCount={taskCount}
        tokenReceiptDate={tokenReceiptDate}
        tokenValidityPeriod={tokenValidityPeriod}
        tasksOnPage={tasksOnPage}
        url={url}
        page={page}
      />,
      newTask: <NewTaskForm setCommonState={this.setCommonState()} url={url} />,
      editTask: <EditTaskForm
        setCommonState={this.setCommonState()}
        tasks={tasks}
        editedTaskId={editedTaskId}
        token={token}
        tokenReceiptDate={tokenReceiptDate}
        tokenValidityPeriod={tokenValidityPeriod}
        url={url}
      />,
    };
    return mapping[currentComponent];
  }

  render() {
    const { url } = this.state;
    return (
      <div className="row">
        <div className="col-8">
          {this.getConponent()}
        </div>
        <div className="col-4">
          <Authentication setCommonState={this.setCommonState()} url={url} />
        </div>
      </div>
    );
  }
}

export default App;
