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

function SearchBar() {
  return (
    <div className="searchBar">
      <input type="text" />
    </div>
  );
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

function Momentom() {
  return(
    <div className="momentom">
      <Weather />
      <Time />
      <SearchBar />
      <Lists />
    </div>
  )
}

ReactDOM.render(
  <Momentom />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
