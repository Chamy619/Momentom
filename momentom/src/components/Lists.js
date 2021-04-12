import React from 'react';

function Lists(props) {
    return (
        <div className="listContainer">
            <TodoList todoList={props.todoList} removeTodo={props.removeTodo} />
            <DoneList doneList={props.doneList} removeTodo={props.removeTodo} addDone={props.addDone} removeDone={props.removeDone} />
        </div>
    );
}

// class Lists extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className="listContainer">
//                 <TodoList todoList={this.props.todoList} removeTodo={this.props.removeTodo} />
//                 <DoneList doneList={this.props.doneList} removeTodo={this.props.removeTodo} addDone={this.props.addDone} removeDone={this.props.removeDone} />
//             </div>
//         );
//     }
// }

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
    }

    render() {
        return (
            <div className="content todo" draggable="true" onDragStart={this.dragStart} id={this.props.todo} onClick={this.handleClick}>
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
    }

    dragOver(event) {
        event.preventDefault();
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

export default Lists;