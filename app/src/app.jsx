import $ from 'jquery';
// import '../styles/foundation/app.scss';
// import '../styles/main.scss';
import 'file?name=[name].[ext]!../index.html';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import store from './stores/store';
import InvoiceDashboard from './components/dashboard/dashboard.jsx';


class MainApp extends Component {
    render () {
        return <InvoiceDashboard />;
    }
}

const prodTemplate = <div>
    <Provider store={store}>
        <MainApp />
    </Provider>
</div>;

const devStyle = {
    marginLeft: '30%'
};

const devTemplate = <div style={devStyle}>
    <Provider store={store}>
        <MainApp />
    </Provider>
</div>;

ReactDOM.render(
    prodTemplate,
    document.getElementById('main-content')
);
