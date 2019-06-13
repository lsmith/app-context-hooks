import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const createFormDataFormatter = (FormData) => (obj) => {
    let data = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        data.set(key, value);
    });

    return data;
};

export const createServiceAPI = (requestAPI) => ({
    fetchFromAPI: (url) => requestAPI(url),
    postToAPI: (url, body) => requestAPI(url, { method: 'POST', body }),
    putToAPI: (url, body) => requestAPI(url, { method: 'PUT', body }),
    deleteFromAPI: (url) => requestAPI(url, { method: 'DELETE' }),
});

export const createAnalyticsAPI = (beaconAPI, toFormData) => (category, type, data) =>
    beaconAPI('/track', toFormData({
        category,
        type,
        ...data,
    }));

export const createLogger = (beaconAPI, toFormData) => (category, message, level = 'INFO') =>
    beaconAPI('/log', toFormData({ category, message, level }));

export const createLocalStorage = (storageAPI) => storageAPI;
// const createWorker = (requestAPI, beaconAPI) => {/* ??? */}

const AppContext = createContext();

export const useAppContext = () => {
  let context = useContext(AppContext);
  if (!context) {
    throw new Error("Must be used inside a WebAppProvider");
  }

  return context;
};

export const AppContextProvider = (props) => {
    let {
        global,
        document,
        requestAPI,
        beaconAPI,
        localStorageAPI,
        ...restProps
    } = props;

    let toFormData = useRef(createFormDataFormatter(global.FormData));

    let [globalObject, setGlobalObject] = useState(global);
    let [documentObject, setDocument] = useState(document);
    let [serviceAPI, setServiceAPI] = useState(createServiceAPI(requestAPI));
    let [trackAnalytics, setAnalyticsTracker] = useState(createAnalyticsAPI(beaconAPI, toFormData.current));
    let [log, setLogger] = useState(createLogger(beaconAPI, toFormData.current));
    let [localStorage, setLocalStorageAPI] = useState(createLocalStorage(localStorageAPI));

    useEffect(() => {
        // If the global object changes, the FormData class might use a different
        // implementation, so the analytics and logger apis need to be recreated
        // using a newly generated toFormData helper. If the apis inlined the
        // FormData creation, the helper wouldn't be needed (shrug).
        toFormData.current = createFormDataFormatter(globalObject.FormData);
        setAnalyticsTracker(createAnalyticsAPI(beaconAPI, toFormData.current));
        setLogger(createLogger(beaconAPI, toFormData.current));
    }, [globalObject, beaconAPI]);

    let value = {
        global: globalObject,
        document: documentObject,
        serviceAPI,
        trackAnalytics,
        log,
        localStorage,

        setGlobalObject,
        setDocument,
        setServiceAPI,
        setAnalyticsTracker,
        setLogger,
        setLocalStorageAPI,
    };

    return <AppContext.Provider value={value} {...restProps} />;
};
