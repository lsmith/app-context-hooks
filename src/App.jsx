import React, { useReducer, useState, useEffect } from 'react';
import './App.css';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import todoReducer from './app-reducer';
import {
    getFromStorage,
    putInStorage,
} from './lib/storage';
import { getUrl } from './lib/urls';
import { getFromServer } from './lib/io';
import track from './lib/analytics';

import {
    TODO,
    ACTION_CREATE,
    URL_TODOS,
} from './constants';

const addTodo = (description) => ({
    type: 'add',
    todo: {
        description,
    },
});

const updateTodo = (id, updates) =>
    updates.description.trim() === ''
        ? deleteTodo(id)
        : ({
            type: 'update',
            id,
            todo: { ...updates },
        });

const deleteTodo = (id) => ({
    type: 'delete',
    id,
});

const initTodos = (todos) => ({
    type: 'init',
    todos,
});

export default function App() {
    let [todos, dispatch] = useReducer(todoReducer, []);
    let [showDone, setShowDone] = useState(false);
    
    useEffect(() => {(async () => {
        // Load local/offline
        let todosFromStorage = await getFromStorage('todos');

        dispatch(initTodos(todosFromStorage));

        // Load from server.
        // TODO: Load from server in the app, and have a service worker intercept the 
        // request to load from storage first, then syncing with the server.
        // let response = await getFromServer({ url: getUrl(URL_TODOS) });
        // if (response) {
        //     let todosFromServer = await response.json();
        //     dispatch(initTodos(todosFromServer));
        // }
    })()}, []);

    useEffect(() => {
        putInStorage('todos', todos);
    }, [todos]);

    let totalTodos = todos.length;
    let unfinishedTodos = todos.filter(({ done }) => !done);
    let finishedCount = totalTodos - unfinishedTodos.length;

    let onSubmit = (description) => {
        track(TODO, ACTION_CREATE, { value: description });

        dispatch(addTodo(description));
    };

    return (
        <>
            <header className="app-header">
                <h1>Another Todo app </h1>
            </header>
            <main className="app-content">
                {!!finishedCount &&
                    <div className="filter-toggle">
                        <label>
                            <input
                                type="checkbox"
                                checked={showDone}
                                onChange={(e) => { setShowDone(e.currentTarget.checked); }}
                            />
                            Show {finishedCount} completed tasks
                        </label>
                    </div>
                }
                <TodoForm onSubmit={onSubmit} />
                <TodoList
                    todos={showDone ? todos : unfinishedTodos}
                    onUpdateTodo={(id, newTodoData) => dispatch(updateTodo(id, newTodoData))}
                    onDeleteTodo={(id) => dispatch(deleteTodo(id))}
                />
            </main>
        </>
    );
};
