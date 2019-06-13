
// TODO: All of these are totally imperative. Move the state to the app and
// trigger the localForage update as a side effect.
export const fetchStoredTodos = async (storageAPI) => storageAPI.getItem('todos');

export const storeTodos = async (todos, storageAPI) => storageAPI.setItem('todos', todos);
