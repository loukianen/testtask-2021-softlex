import React from 'react';
import Tasks from './Tasks.jsx';
import NewTaskForm from './NewTaskForm.jsx';
import EditTaskForm from './EditTaskForm.jsx';
import Authentication from './Authentication.jsx';

const tasks = [
  {
    "id": 1,
    "username": "Test User",
    "email": "test_user_1@example.com",
    "text": "Hello, world!",
    "status": 10,
  },
  {
      "id": 3,
      "username": "Test User 2",
      "email": "test_user_2@example.com",
      "text": "Hello from user 2!",
      "status": 11,
  },
  {
      "id": 4,
      "username": "Test User 3",
      "email": "test_user_3@example.com",
      "text": "Hello from user 3!",
      "status": 1,
  },
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: 'MWxDRnNDNFhFRndsWDQyeGxHamIwdXpUS2Z4MVg2UDFjQ2cxQldQVjAxZDh5MXVMdTJsWVBNeU85c2J3YUgyYkw0SFRFQURnVmV3VkxFeG9yVW9kSnc9PQ==',
      tokenReceiptDate: Date.now(),
      tokenValidityPeriod: 1000 * 60 * 60 * 24, // period 24 hours (in milliseconds)
      currentComponent: 'tasks',
      editedTaskId: null,
      tasks,
    };
  }

  getConponent() {
    const mapping = {
      tasks: <Tasks commonState={this.state} setCommonState={this.setState.bind(this)} />,
      newTask: <NewTaskForm setCommonState={this.setState.bind(this)}/>,
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
          <Authentication setCommonState={this.setState.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
