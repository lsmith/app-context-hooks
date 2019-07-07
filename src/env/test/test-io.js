import EventEmitter from 'events';

// const toQueryString = (data) =>
//     Object.entries(data).reduce((params, [key, value]) => {
//         params.append(key, (value && typeof value === 'object') ? JSON.stringify(value) : value);
//         return params;
//     }, new URLSearchParams()).toString();

// const toFormData = (data) =>
//     Object.entries(data).reduce((params, [key, value]) => {
//         params.set(key, (value && typeof value === 'object') ? JSON.stringify(value) : value);
//         return params;
//     }, new FormData());

const defaultRouteHandler = (request) => {
    console.log(request);
    return request;
};

export const ioRouter = ((routes) => ({
    route: (url, handler) => {
        routes.set(url, handler);
    },

    getRoutes: (url) =>
        [...routes.keys()]
            .filter((routeUrl) =>
                (typeof routeUrl === 'string' && routeUrl === url) ||
                (routeUrl instanceof RegExp && routeUrl.test(url))
            ),

    hasRoute: (url) => ioRouter.getRoutes(url).length > 0,

    reset: () => routes.clear(),
}))(new Map());

let mockIO = async (request) => {
    let {
        url,
        method = 'GET',
        credentials = 'same-origin',
        headers: {
            // 'Content-Type': contentType = 'application/json',
            'Content-Type': contentType = 'application/x-www-form-urlencoded',
            ...restHeaders
        } = {},
        mode = 'cors',
        body,
        ...config
    } = request;

    if (body) {
        if (method === 'GET') {
            method = 'POST';
        }

        if (typeof body === 'object') {
            // if (contentType.indexOf('urlencoded') > -1) {
            //     body = toQueryString(body);
            // } else if (contentType.indexOf('form-data') > -1) {
            //     body = toFormData(body);
            // } else if (contentType.indexOf('json') > -1) {
            //     body = JSON.stringify(body);
            // }
            if (contentType.indexOf('urlencoded') > -1) {
                body = Object.keys(body).reduce((key, queryString) =>
                    `${(queryString && '&')}${key}=${JSON.stringify(body[key])}`, ''
                );
            } else if (contentType.indexOf('json') > -1) {
                body = JSON.stringify(body);
            }
        }
    }

    let preparedRequest = {
        url,
        method,
        headers: {
            'Content-Type': contentType,
            ...restHeaders,
        },
        mode,
        credentials,
        body,
        ...config,
    };

    let requestHandlers = ioRouter.getRoutes(url) || [defaultRouteHandler];

    return requestHandlers.length === 1
        ? requestHandlers[0](preparedRequest)
        : requestHandlers.map((handler) => handler(preparedRequest));
};

export const beaconNotifier =  new EventEmitter();

export const getFromServer = (url) => mockIO(url);

export const addToServer = (url, body) => mockIO(url, { method: 'POST', body });

export const replaceOnServer = (url, body) => mockIO(url, { method: 'PUT', body });

export const updateOnServer = (url, body) => mockIO(url, { method: 'PATCH', body });

export const deleteFromServer = (url) => mockIO(url, { method: 'DELETE' });

export const notifyServer = (url, data) => { beaconNotifier.emit('beacon', { url, data }); };