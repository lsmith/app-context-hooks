import { container } from './configure-container';

const readOnly = () => {
    throw new Error('Use configure(METHODS) to configure dependency implementations');
};

const proxy = new Proxy(container, {
    set: readOnly,
    defineProperty: readOnly,
    deleteProperty: readOnly,
});

export default proxy;