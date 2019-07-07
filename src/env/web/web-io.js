const toQueryString = (data) =>
    Object.entries(data).reduce((params, [key, value]) => {
        params.append(key, (value && typeof value === 'object') ? JSON.stringify(value) : value);
        return params;
    }, new URLSearchParams()).toString();

const toFormData = (data) =>
    Object.entries(data).reduce((params, [key, value]) => {
        params.set(key, (value && typeof value === 'object') ? JSON.stringify(value) : value);
        return params;
    }, new FormData());


const io = async (request) => {
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
                body = toQueryString(body);
            } else if (contentType.indexOf('form-data') > -1) {
                body = toFormData(body);
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

// const beacon = (url, body) => navigator.sendBeacon(url, toFormData(body));
const beacon = (url, body) => io({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    cache: 'no-cache',
    // allow fetch() to schedule requests for sending even if the page closes,
    // like sendBeacon()
    keepalive: true,
    body,
});

export const getFromServer = (url) => io(url);

export const addToServer = (url, body) => io(url, { method: 'POST', body });

export const replaceOnServer = (url, body) => io(url, { method: 'PUT', body });

export const updateOnServer = (url, body) => io(url, { method: 'PATCH', body });

export const deleteFromServer = (url) => io(url, { method: 'DELETE' });

// ignore beacon responses
export const notifyServer = (url, body) => { beacon(url, body).catch(() => {}); };
