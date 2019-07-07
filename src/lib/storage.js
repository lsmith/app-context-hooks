import env from '../env/container';

export const getFromStorage = (name) => env.storage.getItem(name);

export const putInStorage = async (name, value) => {
    await env.storage.setItem(name, value);
};

export const removeFromStorage = async (name) => {
    await env.storage.removeItem(name);
};

export const clearStorage = async () => {
    await env.storage.clear();
};
