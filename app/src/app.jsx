// import $ from 'jquery';
// import '../styles/foundation/app.scss';
import '../styles/main.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import store from './stores/store';
import MainPage from './pages/main';

const prodTemplate = <div>
    <Provider store={store}>
        <MainPage />
    </Provider>
</div>;

const devStyle = {
    marginLeft: '30%'
};

const devTemplate = <div style={devStyle}>
    <Provider store={store}>
        <MainPage />
    </Provider>
</div>;

ReactDOM.render(
    prodTemplate,
    document.getElementById('main-content')
);
