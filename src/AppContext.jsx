import React, { createContext } from "react";

export const AppContext = createContext();

// Provider class that should be used in the index.js or SPA root where <App />
// is rendered. Takes props providing specific implementations for application
// APIs. Pass mock implementations for testing.
export default function AppContextProvider(props) {
    let {
        children,

        ...appAPIs
    } = props;

    return <AppContext.Provider value={appAPIs}>{children}</AppContext.Provider>
};
