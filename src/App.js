import React, { useReducer } from 'react';
import './App.css';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import todoReducer from './app-reducer';
// import { useAppContext } from './AppContext';

const addTodo = (id, description) => ({
    type: 'add',
    todo: {
        id,
        description,
        done: false,
    },
});

const updateTodo = (updates) => ({ type: 'update', ...updates });

export default function App() {
    let [todos, dispatch] = useReducer(todoReducer, []);
    // let {
    //     requestAPI,
    //     beaconAPI,
    // } = useAppContext();

    // TODO: I'm here. Continue dev until there's a local Todo app
    // that works from local state stored in App. Then useContext(AppContext)
    // to get the APIs and try storing to localStorage and posting to a fake
    // serviceAPI.
    return (
        <>
            <header className="app-header">
                <h1>This is a Todo app!</h1>
            </header>
            <main className="app-content">
                {/* {!!onNewTodoSubmit && <TodoForm onSubmit={onNewTodoSubmit} />} */}
                <TodoForm onSubmit={(description) => dispatch(addTodo(todos.length, description))} />
                <TodoList
                    todos={todos}
                    // onUpdateTodo={onUpdateTodo}
                    onUpdateTodo={(...payload) => dispatch(updateTodo(...payload))}
                />
            </main>
        </>
    );
};
