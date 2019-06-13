import React, { useState } from 'react';
import TodoShape from './todo-shape';
import TodoForm from './TodoForm';

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

    let updateDescription = () => {
        onUpdate(description);
        setIsEditing(false);
    };

    return (
        <li className={className}>
            {isEditing ?
                <TodoForm
                    onSubmit={updateDescription}
                    onCancel={() => setIsEditing(false)}
                    submitLabel="Update"
                    initialDescription={description}
                /> :
                <>
                    <p onClick={() => setIsEditing(true)}>{description}</p>
                    <input type="checkbox" checked={done} onChange={onDoneClick} />
                </>
            }
        </li>
    );
};

Todo.propTypes = TodoShape;
Todo.defaultProps = {
    done: false
};
