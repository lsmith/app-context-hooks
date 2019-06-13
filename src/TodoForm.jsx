import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TodoForm.css';

export default function TodoForm(props) {
    let {
        onSubmit,
        onCancel,
        submitLabel = 'Add',
        initialDescription = '',
    } = props;

    let [description, setDescription] = useState(initialDescription);

    let submitAndClear = (e) => {
        e.preventDefault();

        if (description) {
            onSubmit(description);

            setDescription('');
        }
    };

    let cancel = (e) => {
        e.preventDefault();

        onCancel();
    };

    return (
        <form onSubmit={submitAndClear} className="todo">
            <input type="text"
                name="description"
                value={description || ''}
                onChange={({ target: { value }}) => { setDescription(value) }}
            />
            <button type="submit" onClick={submitAndClear}>{submitLabel}</button>
            {onCancel &&
                <button onClick={cancel}>Cancel</button>
            }
        </form>
    );
}

TodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    initialDescription: PropTypes.string,
};
