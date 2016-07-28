import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalNum: 0,
      intervalVal: 1,
      showModal: false,
      taskName: '',
      taskDueDate: '',
      taskInterval: 0
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
    this.calcDueDateAndInterval = this.calcDueDateAndInterval.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  handleTextFieldChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleSelectFieldChange(e, i, v) {
    this.setState({
      intervalVal: v,
    });
  }

  calcDueDateAndInterval() {
    let hours = n => 1000*60*60*n;
    let days = n => hours(n) * 24;

    let n = this.state.intervalNum;

    // 1 = hours; 2 = days
    if (this.state.intervalVal === 1) {
      this.state.taskInterval = hours(n);
    } else if (this.state.intervalVal === 2) {
      this.state.taskInterval = days(n);
    }

    this.state.taskDueDate = new Date(Date.now() + this.state.taskInterval);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.calcDueDateAndInterval();

    let taskName = this.state.taskName;
    let dueDate =  this.state.taskDueDate;
    let interval = this.state.taskInterval;

    if (!taskName || !dueDate) {
      this.close();
      return;
    }

    // socket.emit('create task', {
    //   name: taskName,
    //   dueBy: dueDate,
    //   interval: interval
    // });

    //this.props.onAddNewTask(taskName, dueDate);
    this.setState({
      taskName: '',
      taskDueDate: ''
    });
    this.close();
  }

  render() {
    return(
      <div onClick={this.open}>
        <img className="addTask" src="http://bit.ly/29UZrXq"/>
        <Modal bsSize="small" show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField name="taskName" hintText="Enter a new task!" onChange={this.handleTextFieldChange}/>
          <TextField type="number" name="intervalNum" defaultValue="1" onChange={this.handleTextFieldChange}  floatingLabelText="Recurs every:" floatingLabelFixed={true} />
          <SelectField value={this.state.intervalVal} onChange={this.handleSelectFieldChange}>
            <MenuItem value={1} primaryText="hour(s)" />
            <MenuItem value={2} primaryText="day(s)" />
          </SelectField>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit}>Add Task</Button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// export default AddTask;
/*  code to add to App.jsx

*** component to add to App.jsx ***
<div>
  <AddTask onAddNewTask={this.handleAddNewTask.bind(this)}/>
</div>

*** handler to add to App.jsx ***
handleAddNewTask(taskName, dueDate) {
  // this function will handle
  // posting new task to db &
  // add to pending tasks
  // how to implement???
  console.log('taskName:', taskName);
  console.log('dueDate:', dueDate);
}
*/
