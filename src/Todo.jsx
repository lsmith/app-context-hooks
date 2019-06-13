import React, { useState } from 'react';
import TodoShape from './todo-shape';
import TodoForm from './TodoForm';

import './Todo.css';

export default function Todo(props) {
    let {
        description,
        done,
        onDoneClick,
        onUpdate,
    } = props;

    let [isEditing, setIsEditing] = useState(false);

    let className = 'todo';

    if (done) {
        className += ' done';
    }

    let updateDescription = (newDescription) => {
        onUpdate(newDescription);
        setIsEditing(false);
    };

    return (
        <li className={className}>
            <input type="checkbox" checked={done} disabled={isEditing} onChange={onDoneClick} />
            {isEditing ?
                <TodoForm
                    onSubmit={updateDescription}
                    onCancel={() => setIsEditing(false)}
                    submitLabel="Update"
                    initialDescription={description}
                /> :
                <p onClick={() => setIsEditing(true)}>{description}</p>
            }
        </li>
    );
};

Todo.propTypes = TodoShape;
Todo.defaultProps = {
    done: false
};
