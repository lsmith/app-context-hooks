import * as WEB_ENV from './web-globals';
import * as WEB_IO from './web-io';
import storage from './web-storage';

export default {
    ...WEB_ENV,
    ...WEB_IO,
    storage,
};
