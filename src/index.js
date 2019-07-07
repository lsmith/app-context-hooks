import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import WEB_APIS from './env/web/web-apis';
import WEB_URLS from './env/web/web-urls';
import { setUrls } from './lib/urls';

import { URL_TODOS } from './constants';
import App from './App';

import { configure } from './env/configure-container';

configure(WEB_APIS);

setUrls({
    ...WEB_URLS,
    [URL_TODOS]: '/api/todos',
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
