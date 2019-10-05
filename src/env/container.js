import { container } from './configure-container';

const throws = () => {
    throw new Error('Use configure(METHODS) to configure dependency implementations');
};

const proxy = new Proxy(container, {
    set: throws,
    defineProperty: throws,
    deleteProperty: throws,
});

export default proxy;