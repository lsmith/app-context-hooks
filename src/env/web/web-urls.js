import { global } from './web-globals';

let {
    env: {
        urls = {},
    } = {},
} = global;

export default { ...urls };