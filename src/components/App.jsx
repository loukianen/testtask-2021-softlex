import React from 'react';
import Tasks from './Tasks.jsx';
import NewTaskForm from './NewTaskForm.jsx';
import EditTaskForm from './EditTaskForm.jsx';
import Authentication from './Authentication.jsx';
import { isAuthenticationValid, clearTokenData } from '../utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenValidityPeriod: 1000 * 60 * 60 * 24, // period 24 hours (in milliseconds)
      tasksOnPage: 3,
      page: 1,
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2',
      currentComponent: 'tasks',
      editedTaskId: null,
      tasks: [],
      taskCount: 0,
      authentication: 'notAuthenticated',
    };
  }

  componentDidMount() {
    const { tokenValidityPeriod } = this.state;
    if (isAuthenticationValid(tokenValidityPeriod)) {
      this.setState({ authentication: 'authenticated' });
    } else {
      clearTokenData();
    }
  }

  setCommonState() {
    return this.setState.bind(this);
  }

  getConponent() {
    const {
      tokenValidityPeriod,
      tasksOnPage,
      page,
      url,
      currentComponent,
      editedTaskId,
      tasks,
      taskCount,
      authentication,
    } = this.state;
    const mapping = {
      tasks: <Tasks
        setCommonState={this.setCommonState()}
        tasks={tasks}
        taskCount={taskCount}
        tasksOnPage={tasksOnPage}
        url={url}
        page={page}
        auth={authentication}
      />,
      newTask: <NewTaskForm setCommonState={this.setCommonState()} url={url} />,
      editTask: <EditTaskForm
        setCommonState={this.setCommonState()}
        tasks={tasks}
        editedTaskId={editedTaskId}
        tokenValidityPeriod={tokenValidityPeriod}
        url={url}
        auth={authentication}
      />,
    };
    return mapping[currentComponent];
  }

  render() {
    const { url, authentication } = this.state;
    return (
      <div className="row">
        <div className="col-8">
          {this.getConponent()}
        </div>
        <div className="col-4">
          <Authentication setCommonState={this.setCommonState()} url={url} auth={authentication} />
        </div>
      </div>
    );
  }
}

export default App;
