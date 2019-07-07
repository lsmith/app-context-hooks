import React, { useState } from 'react';
import TodoShape from './todo-shape';
import TodoForm from './TodoForm';
import IconX from './IconX';
import track from './lib/analytics';

import './Todo.css';

import {
    TODO,
    ACTION_EDIT,
    ACTION_SAVE,
    ACTION_CANCEL,
    ACTION_DELETE,
} from './constants';

export default function Todo(props) {
    let {
        id,
        description,
        done,
        onDelete,
        onDoneClick,
        onUpdate,
    } = props;

    let [isEditing, setIsEditing] = useState(false);

    let className = 'todo';

    if (done) {
        className += ' done';
    }

    let onSubmit = (newDescription) => {
        track(TODO, ACTION_SAVE, { todoId: id, value: newDescription });

        onUpdate(id, newDescription);
        setIsEditing(false);
    };

    let onCancel = () => {
        track(TODO, ACTION_CANCEL, { todoId: id });

        setIsEditing(false);
    };

    let onDescriptionClick = () => {
        track(TODO, ACTION_EDIT, { todoId: id, value: description });

        setIsEditing(true);
    };

    let onDeleteClick = () => {
        track(TODO, ACTION_DELETE, { todoId: id });

        onDelete(id);
    };

    return (
        <li className={className}>
            <input type="checkbox" checked={done} disabled={isEditing} onChange={onDoneClick} />
            {isEditing ?
                <TodoForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    submitLabel="Update"
                    initialDescription={description}
                /> :
                <>
                    <p onClick={onDescriptionClick}>{description}</p>
                    <button onClick={onDeleteClick}>
                        <IconX />
                    </button>
                </>
            }
        </li>
    );
};

Todo.propTypes = TodoShape;
Todo.defaultProps = {
    done: false
};
