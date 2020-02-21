import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceForm from '../components/invoice-form/InvoiceForm';
import { fetchCategories, fetchStores, fetchSpenders } from '../components/dashboard/actions';
import { Layout } from 'antd';
import './Dashboard.css';

const { Content, Sider } = Layout;

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.actions.fetchCategories();
    this.props.actions.fetchStores();
    this.props.actions.fetchSpenders();
  }
  
  render() {
    return (<Layout>
      <Sider width="270" theme="light" className="site-layout-background sider">
        <InvoiceForm id="SideLayout"
          stores={this.props.stores}
          categories={this.props.categories}
          spenders={this.props.spenders} 
        />
      </Sider>
      <Layout><Content>Content</Content></Layout>
    </Layout>);
  }
}

function mapStateToProps(state){
  return {
    spenders: state.spenders,
    categories: state.categories,
    stores: state.stores
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: {
    fetchCategories: () => {
      dispatch(fetchCategories(dispatch));
    },
    fetchStores: () => {
      dispatch(fetchStores(dispatch));
    },
    fetchSpenders: () => {
      dispatch(fetchSpenders(dispatch));
    }
  }};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
