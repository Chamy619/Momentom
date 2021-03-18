import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Input from '@material-ui/core/Input';

function Weather() {
  return (
    <div className="weather">
      <span>날씨 자리</span>
    </div>
  );
}

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date()
      })
    }, 1000);
  }

  render() {
    let hours = this.state.time.getHours();
    let minutes = this.state.time.getMinutes();

    if (parseInt(hours) < 10) {
      hours = '0' + hours;
    }

    if (parseInt(minutes) < 10) {
      minutes = '0' + minutes;
    }

    return (
      <div className="time">
        {hours + ':' + minutes}
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: ''
    });
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input placeholder="Enter TODO" type="text" value={this.state.inputValue} onChange={this.handleChange} />
      </form>
    );
  }
}

function Lists(props) {
  return (
    <div>
      <TodoList todoList={props.todoList} removeTodo={props.removeTodo} />
      <DoneList doneList={props.doneList} removeTodo={props.removeTodo} addDone={props.addDone} removeDone={props.removeDone} />
    </div>
  )
}

function TodoList(props) {
  const todoList = [];
  if (props.todoList.length > 0) {
    props.todoList.forEach(todo => {
      todoList.push(<Todo key={todo} todo={todo} removeTodo={props.removeTodo} />);
    });
  }
  
  return (
    <div className="todoList">
      <h3>Todo List</h3>
      {todoList}
    </div>
  );
}

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    //this.dragStart = this.dragStart.bind(this);
  }

  handleClick(event) {
    this.props.removeTodo(event.target.id);
  }

  dragStart(event) {
    event.dataTransfer.setData('targetId', event.target.id);
    //console.log('dragStart', event);
  }

  // dragging(event) {
  //   //console.log('dragging', event);
  // }

  render() {
    return (
      <div className="todo" draggable="true" /*onDrag={this.dragging}*/ onDragStart={this.dragStart} id={this.props.todo} onClick={this.handleClick}>
        {this.props.todo}
      </div>
    );
  }
}

class DoneList extends React.Component {
  constructor(props) {
    super(props);

    this.dropEvent = this.dropEvent.bind(this);
  }

  dropEvent(event) {
    this.props.addDone(event.dataTransfer.getData('targetId'));
    this.props.removeTodo(event.dataTransfer.getData('targetId'));
    //console.log('onDrop', event);
  }

  dragOver(event) {
    event.preventDefault();
    //console.log('drag over', event);
  }

  render() {
    const doneList = [];
    if (this.props.doneList.length > 0) {
      this.props.doneList.forEach((done) => {
        doneList.push(<Done key={done} id={done} value={done} removeDone={this.props.removeDone} />);
      });
    }

    return (
      <div className="doneList" droppable="true" onDrop={this.dropEvent} onDragOver={this.dragOver}>
      <h3>Done List</h3>
      {doneList}
    </div>
    );
  }
}

function Done(props) {
  function removeDone(event) {
    props.removeDone(event.target.id);
  }

  return (
    <div className="done" id={props.id} onClick={removeDone}>
      {props.value}
    </div>
  )
}

class Momentum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      todoList: [],
      doneList: [],
      alreadyExist: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.addDone = this.addDone.bind(this);
    this.removeDone = this.removeDone.bind(this);
  } 

  handleSubmit(value) {
    const todoList = this.state.todoList;
    
    if (todoList.indexOf(value) === -1) {
      todoList.push(value);
      this.setState({
        inputValue: value,
        todoList: todoList,
        alreadyExist: false
      });
    } else {
      this.setState({
        alreadyExist: true
      });
    }
  }

  removeTodo(value) {
    let todoList = this.state.todoList;
    todoList = todoList.filter(todo => todo !== value);
    this.setState({
      todoList: todoList
    });
  }

  addDone(value) {
    const doneList = this.state.doneList;
    doneList.push(value);
    this.setState({
      doneList: doneList
    });
  }

  removeDone(value) {
    let doneList = this.state.doneList;
    doneList = doneList.filter((done) => done !== value);
    this.setState({
      doneList: doneList
    });
  }

  render() {
    const alreadyExistMessage = this.state.alreadyExist ? '이미 존재합니다' : '';
    return(
      <div className="momentum">
        <Weather />
        <Time />
        <SearchBar handleSubmit={this.handleSubmit}/>
        <span className="alertMessage">{alreadyExistMessage}</span>
        <Lists todoList={this.state.todoList} doneList={this.state.doneList} removeTodo={this.removeTodo} addDone={this.addDone} removeDone={this.removeDone} />    
      </div>
    )
  }
}

ReactDOM.render(
  <Momentum />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
