import { createStore } from 'redux';

function backgroundClickReducer(state = { show: false, showMenu: false }, action) {
    switch (action.type) {
        case 'mouseOver':
            return { show: true, showMenu: state.showMenu };
        case 'mouseLeave':
            return { show: state.showMenu, showMenu: state.showMenu };
        case 'menuClick':
            return { show: true, showMenu: true };
        case 'clickBackground':
            return { show: false, showMenu: false };
        default:
            return { show: state.show, showMenu: state.showMenu };
    }
}

const store = createStore(backgroundClickReducer);

export default store;