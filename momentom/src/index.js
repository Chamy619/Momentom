import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

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
  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(event.target.childNodes[0].value);
    event.target.childNodes[0].value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.props.inputValue} />
      </form>
    );
  }
}

function Lists(props) {
  return (
    <div>
      <TodoList todoList={props.todoList} removeTodo={props.removeTodo} />
      <DoneList />
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
  }

  dropEvent(event) {
    console.log(event.dataTransfer.getData('targetId'));
    //console.log('onDrop', event);
  }

  dragOver(event) {
    event.preventDefault();
    //console.log('drag over', event);
  }

  render() {
    return (
      <div className="doneList" droppable="true" onDrop={this.dropEvent} onDragOver={this.dragOver}>
      <h3>Done List</h3>
      <Done />
    </div>
    );
  }
}

function Done() {
  return (
    <div className="done">
      한 일
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

  render() {
    const alreadyExistMessage = this.state.alreadyExist ? '이미 존재합니다' : '';
    return(
      <div className="momentum">
        <Weather />
        <Time />
        <SearchBar handleSubmit={this.handleSubmit}/>
        <span className="alertMessage">{alreadyExistMessage}</span>
        <Lists todoList={this.state.todoList} removeTodo={this.removeTodo} />    
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
