import env from '../env/container';

export const getFromServer = (url) => env.io(url);

export const addToServer = (url, body) => env.io(url, { method: 'POST', body });

export const replaceOnServer = (url, body) => env.io(url, { method: 'PUT', body });

export const updateOnServer = (url, body) => env.io(url, { method: 'PATCH', body });

export const deleteFromServer = (url) => env.io(url, { method: 'DELETE' });

// ignore beacon responses
export const notifyServer = (url, body) => { env.beacon(url, body).catch(() => {}); };