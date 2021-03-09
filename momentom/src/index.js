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
      <TodoList todoList={props.todoList} />
      <DoneList />
    </div>
  )
}

function TodoList(props) {
  console.log(props.todoList);
  const todoList = [];
  if (props.todoList.length > 0) {
    props.todoList.forEach(todo => {
      todoList.push(<Todo key={todo} todo={todo} />);
    });
  }
  
  return (
    <div className="todoList">
      {todoList}
    </div>
  );
}

function Todo(props) {
  return (
    <div className="todo">
      {props.todo}
    </div>
  );
}

function DoneList() {
  return (
    <div className="doneList">
      <Done />
    </div>
  );
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
      todoList: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit(value) {
    const todoList = this.state.todoList;
    todoList.push(value);
    this.setState({
      inputValue: value,
      todoList: todoList
    });
  }

  render() {
    return(
      <div className="momentum">
        <Weather />
        <Time />
        <SearchBar handleSubmit={this.handleSubmit}/>
        <Lists todoList={this.state.todoList} />    
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
