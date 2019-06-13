import React, { useReducer, useEffect } from 'react';
import './App.css';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import todoReducer from './app-reducer';
import { useAppContext } from './AppContext';

const addTodo = (description) => ({
    type: 'add',
    todo: {
        description,
    },
});

const updateTodo = (id, updates) => ({
    type: 'update',
    id,
    todo: { ...updates },
});

const initTodos = (todos) => ({
    type: 'init',
    todos,
});

export default function App() {
    let { localStorage } = useAppContext();
    let [todos, dispatch] = useReducer(todoReducer, []);
    
    useEffect(() => {
        localStorage.getItem('todos').then((todosFromStorage) => {
            dispatch(initTodos(todosFromStorage));
        });
    }, [localStorage]);

    useEffect(() => {
        localStorage.setItem('todos', todos);
    }, [todos, localStorage]);

    return (
        <>
            <header className="app-header">
                <h1>Another Todo app </h1>
            </header>
            <main className="app-content">
                <TodoForm onSubmit={(description) => dispatch(addTodo(description))} />
                <TodoList
                    todos={todos}
                    onUpdateTodo={(id, newTodoData) => dispatch(updateTodo(id, newTodoData))}
                />
            </main>
        </>
    );
};
