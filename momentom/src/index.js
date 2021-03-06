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

function Time() {
  return (
    <div className="time">
      <span>현재 시간</span>
    </div>
  );
}

function SearchBar() {
  return (
    <div class="searchBar">
      <input type="text" />
    </div>
  );
}

function TodoList() {
  return (
    <div class="todoList">
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

function Momentom() {
  return(
    <div className="momentom">
      <Weather />
      <Time />
      <SearchBar />
      <TodoList />
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
