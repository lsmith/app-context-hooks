export default (todos, { type, id, ...payload }) => {
    switch (type) {
        case 'add':
            return [...todos, {
                id: todos.length,
                ...payload,
                done: false,
            }];

        case 'update': {
            let index = todos.indexOf(id);

            if (index === -1) {
                return todos;
            }

            let newTodos = todos.slice();
            newTodos[index] = {
                ...todos[index],
                ...payload,
                id,
            };

            return newTodos;
        }

        default: return todos;
    }
};
