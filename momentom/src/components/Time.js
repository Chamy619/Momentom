import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';

import store from '../store.js';

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

        store.subscribe(() => {
            this.setState({
                showTimeMenu: store.getState().show
            });
        })
    }

    showTimeMenu(event) {
        this.setState({
            showTimeMenu: true
        });
        store.dispatch({ type: 'mouseOver' });
        event.stopPropagation();
    }

    clickTimeMenu() {
        this.setState({
            clickedTimeMenu: !this.state.clickedTimeMenu
        });
    }

    hideTimeMenu() {
        if (!store.getState().showMenu) {
            store.dispatch({ type: 'mouseLeave' });
        }
    }

    changeTimeFormat(event) {
        event.stopPropagation();
        this.setState({
            showFullHour: !this.state.showFullHour
        });
        store.dispatch({ type: 'menuClick' });
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
                <div className="timeType"></div>
                <div className="time">{hours + ':' + minutes}</div>
                <TimeMenu clickTimeMenu={this.clickTimeMenu} showTimeMenu={this.state.showTimeMenu} changeTimeFormat={this.changeTimeFormat} showFullHour={this.state.showFullHour} />
            </div>
        );
    }
}

class TimeMenu extends React.Component {
    constructor(props) {
        super(props);

        this.clickMenu = this.clickMenu.bind(this);
    }

    clickMenu(event) {
        event.stopPropagation();
        store.dispatch({ type: 'menuClick' });
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

        if (store.getState().show && store.getState().showMenu) {
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
            <li>24-hour clock <Switch checked={props.showFullHour} onChange={props.changeTimeFormat} /></li>
        </ul>
    );
}

export default Time;