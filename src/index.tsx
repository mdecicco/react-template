import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import API from 'api';
import { CounterPage } from 'pages';

render(
    <Provider store={API.createStore()}>
        <CounterPage />
    </Provider>
    , document.getElementById('root')
);