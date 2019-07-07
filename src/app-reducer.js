import uuid from 'uuid/v1';

export default (todos, action) => {

    switch (action.type) {
        case 'add': {
            return [...todos, {
                ...action.todo,
                id: uuid(),
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

        case 'delete': {
            let index = todos.findIndex((todoItem) => action.id === todoItem.id);

            if (index === -1) {
                return todos;
            }

            let newTodos = todos.slice();

            newTodos.splice(index, 1);

            return newTodos;
        }

        case 'init': {
            return action.todos || [];
        }

        default: return todos;
    }
};
