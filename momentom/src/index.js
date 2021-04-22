import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


import Weather from './components/Weather.js';
import Time from './components/Time.js';
import SearchBar from './components/SearchBar.js';
import Lists from './components/Lists.js';

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

  clickTimeMenu() {
    this.setState({
      showTimeMenu: !this.state.showTimeMenu
    });
  }

  render() {
    const alreadyExistMessage = this.state.alreadyExist ? '이미 존재합니다' : '';
    return (
      <div className="momentum" onClick={this.clickBackground}>
        <Weather />
        <Time />
        <SearchBar handleSubmit={this.handleSubmit} />
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
