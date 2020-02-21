import '../styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import MainPage from './pages/main';
import './App.scss';

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
    