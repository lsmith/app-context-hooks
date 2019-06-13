import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import WEB_CONTEXT from './web-context';
import { AppContextProvider } from './AppContext';
import App from './App';

ReactDOM.render(
    <AppContextProvider {...WEB_CONTEXT}>
        <App />
    </AppContextProvider>,
    document.getElementById('root')
);
