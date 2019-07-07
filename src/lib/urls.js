const urls = new Map();

export const getUrl = (name) => urls.get(name);
export const hasUrl = (name) => urls.has(name);
export const setUrl = (name, url) => { urls.set(name, url); };
export const removeUrl = (name) => { urls.delete(name); };

export const setUrls = (map = {}) => {
    Object.entries(map).forEach(([name, url]) => setUrl(name, url));
};

export const matchUrl = (regex) =>
    urls.keys().filter((name) => regex.test(urls.get(name)));
