import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

        onSubmit(description);

        setDescription('');
    };

    return (
        <form onSubmit={submitAndClear} className="todo">
            <input type="text"
                name="description"
                value={description}
                onChange={({ value }) => { setDescription(value) }}
            />
            <button onClick={submitAndClear}>{submitLabel}</button>
            {onCancel &&
                <button onClick={onCancel}>Cancel</button>
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
