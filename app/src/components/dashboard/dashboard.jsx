import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceForm from '../invoice-form/invoice';
import { fetchCategories, fetchStores, fetchSpenders } from './actions';
import { Layout } from 'antd';

class InvoiceDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.actions.fetchCategories();
    this.props.actions.fetchStores();
    this.props.actions.fetchSpenders();
  }
  
  render() {
    return (<Layout>
      <Layout.Sider>
        <InvoiceForm id="SideLayout"
          stores={this.props.stores}
          categories={this.props.categories}
          spenders={this.props.spenders} 
        />
      </Layout.Sider>
      <Layout>Content</Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDashboard);
