import localForage from 'localforage';

let request = (request) => {
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
            if (contentType.indexOf('urlencoded') > -1) {
                body = Object.keys(body).reduce((key, queryString) =>
                    `${(queryString && '&')}${key}=${JSON.stringify(body[key])}`, ''
                );
            } else if (contentType.indexOf('json') > -1) {
                body = JSON.stringify(body);
            }
        }
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': contentType,
            ...restHeaders,
        },
        mode,
        credentials,
        body,
        ...config,
    });
};

const beacon = (url, data) => {
    navigator.sendBeacon(url, data);
};

export default {
    global: window,
    document: document,
    requestAPI: request,
    beaconAPI: beacon,
    localStorageAPI: localForage,
};
