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
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2',
      currentComponent: 'tasks',
      editedTaskId: null,
      tasks: null,
      taskCount: null,
    };
  }

  getConponent() {
    const mapping = {
      tasks: <Tasks commonState={this.state} setCommonState={this.setState.bind(this)} />,
      newTask: <NewTaskForm setCommonState={this.setState.bind(this)} commonState={this.state}/>,
      editTask: <EditTaskForm setCommonState={this.setState.bind(this)} commonState={this.state}/>,
    };
    return mapping[this.state.currentComponent];
  }

  render() {
    return (
      <div className="row">
        <div className="col-8">
          {this.getConponent()}
        </div>
        <div className='col-4'>
          <Authentication setCommonState={this.setState.bind(this)} commonState={this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
