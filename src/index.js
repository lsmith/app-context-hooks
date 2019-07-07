import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import WEB_APIS from './env/web/web-apis';
import WEB_URLS from './env/web/web-urls';
import * as URL_APIS from './urls';

import { URL_TODOS } from './url-constants';
import { default as AppContextProvider } from './AppContext';
import App from './App';

URL_APIS.setUrls({
    ...WEB_URLS,
    [URL_TODOS]: '/api/todos',
});

ReactDOM.render(
    // <AppContextProvider {...WEB_CONTEXT} beacon={beacon}>
    <AppContextProvider {...WEB_APIS} {...URL_APIS}>
        <App />
    </AppContextProvider>,
    document.getElementById('root')
);
