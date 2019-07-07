import React, { useReducer, useState, useEffect } from 'react';
import './App.css';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import todoReducer from './app-reducer';
import useStorage from './hooks/use-storage';
import useAnalytics from './hooks/use-analytics';
import useAPI from './hooks/use-api';
import useUrls from './hooks/use-urls';

import {
    TODO,
    ACTION_CREATE,
} from './constants';
import { URL_TODOS } from './url-constants';

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
    let { getFromStorage, putInStorage } = useStorage();
    let { getUrl } = useUrls();
    let { getFromServer } = useAPI();
    let track = useAnalytics(TODO);

    let [todos, dispatch] = useReducer(todoReducer, []);
    let [showDone, setShowDone] = useState(false);
    
    useEffect(() => {(async () => {
        // Load local/offline first
        // let todosFromStorage = await getFromStorage('todos');

        // dispatch(initTodos(todosFromStorage));

        // then load from server.
        // TODO: the load from storage, falling back to the server should be
        // handled by a service worker
        let response = await getFromServer({ url: getUrl(URL_TODOS) });
        if (response) {
            let todosFromServer = await response.json();
            dispatch(initTodos(todosFromServer));
        }
    })()}, [getFromStorage, getFromServer, getUrl]);

    useEffect(() => {
        putInStorage('todos', todos);
    }, [todos, putInStorage]);

    let totalTodos = todos.length;
    let unfinishedTodos = todos.filter(({ done }) => !done);
    let finishedCount = totalTodos - unfinishedTodos.length;

    let onSubmit = (description) => {
        track(ACTION_CREATE, { value: description });

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
