import EventEmitter from 'events';

const mockStorage = new Map();

export const storageAccessNotifier = new EventEmitter(); 

export const populateMockStorage = (map) => {
    storageAccessNotifier.emit('populate', map);

    mockStorage.clear();

    Object.entries(map).forEach(([key, data]) => {
        mockStorage.set(key, data);
    });
};

export const getFromStorage = async (name) => {
    storageAccessNotifier.emit('get', name);

    return await mockStorage.get(name);
};

export const putInStorage = async (name, value) => {
    storageAccessNotifier.emit('put', [name, value]);

    await mockStorage.set(name, value);
};

export const removeFromStorage = async (name) => {
    storageAccessNotifier.emit('remove', name);

    await mockStorage.delete(name);
};

export const clearStorage = async () => {
    storageAccessNotifier.emit('clear');

    mockStorage.clear();
};
