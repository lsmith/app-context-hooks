export default (todos, action) => {

    switch (action.type) {
        case 'add': {
            return [...todos, {
                ...action.todo,
                id: todos.length,
                done: false,
            }];
        }

        case 'update': {
            let index = todos.findIndex((todoItem) => action.id === todoItem.id);

            if (index === -1) {
                return todos;
            }

            let newTodos = todos.slice();
            newTodos[index] = {
                ...todos[index],
                ...action.todo,
                id: action.id,
            };

            return newTodos;
        }

        case 'init': {
            return action.todos || [];
        }

        default: return todos;
    }
};
