import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// import createNotifier from './event-notifier';

import WEB_CONTEXT from './web-context';
import { AppContextProvider } from './AppContext';
import App from './App';

// import * as serviceWorker from './serviceWorker';

/*
let createNotifier = () => {
    let eventSubs = new Map();

    return [
        // subscribe
        (name, callback) => {
            let subs = new Set(eventSubs.get(name));

            eventSubs.set(name, [...subs.add(callback)]);
        },

        // notify
        (name, payload) => {
            let subs = eventSubs.get(name);

            if (subs) {
                subs.forEach((callback) => callback(payload));
            }
        },

        // detach
        (name, callback) => {
            let subs = new Set(eventSubs.get(name));

            subs.delete(callback) && eventSubs.set(name, [...subs]);
        }
    ]
};

let { on, notify } = createNotifier();
let onAll = (names, callback) => names.forEach((name) => on(name, callback));

// b(a(...)) in order to execute the composed functions in the order they're
// passed to ...funcs. compose(a, b, c) returns a function equivalent to c(b(a(...)))
let compose = (...funcs) =>
    funcs.reduce((a, b) => (arg0, ...args) => b(a(arg0, ...args), ...args));

let createStore = (notify, reducerMap) => {
    let reducers = new Map();
    let state;

    let store = {
        dispatch: (action) => {
            if (action && reducers.has(action.type)) {
                let prevState = state;
                state = reducers.get(action.type)(state, action);

                if (prevState !== state) {
                    notify('stateChange', state);
                }
            }
        },

        getState: () => state,

        addReducer: (type, reducer) => {
            if (reducers.has(type)) {
                let currentReducer = reducers.get(type);
                let typeReducers = currentReducer.reducers || new Set(currentReducer);

                typeReducers.add(reducer);

                let composedReducer = compose([...typeReducers]);
                composedReducer.reducers = typeReducers;

                reducers.set(type, composedReducer);
            } else {
                handlers.set(type, reducer);
            }
        },

        removeReducer: (type, reducer) => {
            if (!reducers.has(type)) {
                return;
            }

            let currentReducer = reducers.get(type);
            let reducerSet = currentReducer.reducers || new Set(currentReducer);

            reducerSet.delete(reducer);

            switch (reducerSet.size) {
                case 0:
                    reducers.delete(type);
                    break;

                case 1:
                    reducers.set(type, [...reducerSet][0]);
                    break;
                
                default: {
                    let composedReducer = compose([...reducerSet]);
                    composedReducer.reducers = reducerSet;
                    reducers.set(type, composedReducer);
                }
            }
        }
    };

    if (reducerMap) {
        Object.entries(reducerMap).forEach((args) => store.addReducer(...args));
    }

    return store;
};

let uiStore = createStore(notify, {
    'todo:add': (state, { description }) => ({
        ...state,
        todos: [...state.todos, {
            id: state.todos.length,
            done: false,
            description,
        }],
    }),

    'todo:update': (state, { id, changes }) => {
        let index = state.todos.findIndex(({ id: todoId }) => id === todoId);

        if (index === -1) {
            return state;
        }

        let todos = [...state.todos];
        todos[index] = {
            ...state.todos[index],
            ...changes,
        };

        return {
            ...state,
            todos,
        };
    },
});

let bindEvents = (notify) => ({
    notifyAddTodo: (description) => notify('todo:add', { description }),
    notifyUpdateTodo: (id, changes) => notify('todo:update', { id, changes }),
});

let {
    notifyAddTodo,
    notifyUpdateTodo,
} = bindEvents(notify);

let bindActions = ()
let {
    addTodo,
    updateTodo,
} = bindActions(state);

let renderApp = ({ todos }, onNewTodoSubmit, onTodoUpdate) => {
    ReactDOM.render(
        <App
            todos={todos}
            onAdd={onNewTodoSubmit}
            onUpdate={onTodoUpdate}
        />,
        document.getElementById('root')
    );
};

onAll(['todo:add', 'todo:update'], () => notify('stateChange', state));
on('stateChange', () => renderApp(state, notifyAddTodo, notifyUpdateTodo));
on('init', initStorageAPI);

renderApp();

initStorageAPI(localForage);

getTodos().then((todosFromStorage) => {
    todos = todosFromStorage || [];
    renderApp();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

ReactDOM.render(
    <AppContextProvider {...WEB_CONTEXT}>
        <App />
    </AppContextProvider>,
    document.getElementById('root')
);
