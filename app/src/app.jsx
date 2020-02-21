import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import PageNavigation from './pages/PageNavigation';
import Header from './components/Header';

import { Layout } from 'antd';
import './App.css';

const prodTemplate = 
  <Provider store={store}>
    <Layout className='main-layout'>
      <Header />  
      <PageNavigation />
    </Layout>
  </Provider>;

const devStyle = {
  marginLeft: '30%'
};

const devTemplate = <div style={devStyle}>
  <Provider store={store}>
    <PageNavigation />
  </Provider>
</div>;

ReactDOM.render(
  prodTemplate,
  document.getElementById('main-content')
);
    