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
    
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.value} />
      </form>
    );
  }
}

function Lists() {
  return (
    <div>
      <TodoList />
      <DoneList />
    </div>
  )
}

function TodoList() {
  return (
    <div className="todoList">
      <Todo />
    </div>
  );
}

function Todo() {
  return (
    <div className="todo">
      할 일
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
      inputValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit(value) {
    console.log(value);
    this.setState({
      inputValue: value
    });
  }

  render() {
    return(
      <div className="momentum">
        <Weather />
        <Time />
        <SearchBar handleSubmit={this.handleSubmit}/>
        <Lists />
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
