import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import TodoShape from './todo-shape';

export default function TodoList({ todos, onUpdateTodo }) {
    return (
        <ul className="todo-list">
            {todos.map((todo) =>
                <Todo key={`todo-${todo.id}`}
                    {...todo}
                    onDoneClick={() => onUpdateTodo(todo.id, { ...todo, done: !todo.done })}
                    onUpdate={(description) => onUpdateTodo(todo.id, { ...todo, description })}
                />
            )}
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape(TodoShape)),
    onUpdateTodo: PropTypes.func,
};