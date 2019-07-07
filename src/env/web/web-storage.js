import localForage from 'localforage';

export const getFromStorage = (name) => localForage.getItem(name);

export const putInStorage = async (name, value) => {
    await localForage.setItem(name, value);
};

export const removeFromStorage = async (name) => {
    await localForage.removeItem(name);
};

export const clearStorage = async () => {
    await localForage.clear();
};
