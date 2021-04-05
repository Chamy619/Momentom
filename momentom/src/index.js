import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
// import AddIcon from '@material-ui/icons/Add';
// import {MdDehaze} from "react-icons/md"

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loc: '위치를 확인할 수 없습니다.'
    }
  }

  componentDidMount() {
    setInterval(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&y=${latitude}&x=${longitude}`, {
            headers: {
              Authorization: 'KakaoAK d9a42fd2b9cf0e46f42c6d65a28d793b'
            }
          })
          .then(response => response.json())
          .then(geoData => {
            if (geoData.documents) {
              this.setState({
                loc: geoData.documents[1].address_name
              });
            }
            
          });
        });
      }
    }, 300000); 
  }

  render() {
    return (
      <div className="weather">
        <span>{this.state.loc} <br />
        날씨 자리</span>
      </div>
    );
  } 
}

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      showFullHour: true,
      showTimeMenu: false,
      clickedTimeMenu: false,
    }

    this.changeTimeFormat = this.changeTimeFormat.bind(this);
    this.showTimeMenu = this.showTimeMenu.bind(this);
    this.hideTimeMenu = this.hideTimeMenu.bind(this);
    this.clickTimeMenu = this.clickTimeMenu.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date()
      })
    }, 1000);
  }

  showTimeMenu(event) {
    this.setState({
      showTimeMenu: true
    });
    event.stopPropagation();
  }

  clickTimeMenu() {
    this.setState({
      clickedTimeMenu: !this.state.clickedTimeMenu
    });
  }

  hideTimeMenu() {
    if (!this.state.clickedTimeMenu) {
      this.setState({
        showTimeMenu: false
      });
    }
  }

  changeTimeFormat() {
    this.setState({
      showFullHour: !this.state.showFullHour
    });
  }

  render() {
    let hours = this.state.time.getHours();
    let minutes = this.state.time.getMinutes();

    if (!this.state.showFullHour && hours > 12) {
      hours -= 12;
    }

    if (parseInt(hours) < 10) {
      hours = '0' + hours;
    }

    if (parseInt(minutes) < 10) {
      minutes = '0' + minutes;
    }

    return (
      <div className="timeContainer" onMouseOver={this.showTimeMenu} onMouseLeave={this.hideTimeMenu} >
        <div className="timeType">선택</div>
        <div className="time">{hours + ':' + minutes}</div>
        <TimeMenu clickTimeMenu={this.clickTimeMenu} showTimeMenu={this.state.showTimeMenu} changeTimeFormat={this.changeTimeFormat} showFullHour={this.state.showFullHour} />
      </div>
    );
  }
}

class TimeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.clickMenu = this.clickMenu.bind(this);
  }

  clickMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
    this.props.clickTimeMenu();
  }

  render() {
    let menu = '';
    let changeTimeFormat = '';

    if (this.props.showTimeMenu) {
      menu = (
        <div className="iconCover" onClick={this.clickMenu}>
          <Fab size="small" color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      );
    }

    if (this.state.showMenu) {
      changeTimeFormat = <ChangeTimeFormat changeTimeFormat={this.props.changeTimeFormat} showFullHour={this.props.showFullHour} />
    }

    return (
      <div className="timeMenu">
        {menu}
        {changeTimeFormat}
      </div>
    );
  }
}

function ChangeTimeFormat(props) {
  return (
    <ul className="changeTimeFormat">
      <li><Switch checked={props.showFullHour} onChange={props.changeTimeFormat} /></li>
    </ul>
  );
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
      <form className="searchBar" onSubmit={this.handleSubmit}>
        <Input placeholder="Enter TODO" type="text" fullWidth={true} inputProps={{style: {textAlign: 'center'}}} value={this.state.inputValue} onChange={this.handleChange} />
      </form>
    );
  }
}

function Lists(props) {
  return (
    <div className="listContainer">
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
    <div className="listBox todoList">
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
      <div className="content todo" draggable="true" /*onDrag={this.dragging}*/ onDragStart={this.dragStart} id={this.props.todo} onClick={this.handleClick}>
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
      <div className="listBox doneList" droppable="true" onDrop={this.dropEvent} onDragOver={this.dragOver}>
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
    <div className="content done" id={props.id} onClick={removeDone}>
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
