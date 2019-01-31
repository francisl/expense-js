import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceForm from '../invoice-form/invoice.jsx';
import { fetchCategories, fetchStores, fetchSpenders } from './actions';
// import { Layout } from 'baer/dist/layouts/layout';

class InvoiceDashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.fetchCategories();
        this.props.actions.fetchStores();
        this.props.actions.fetchSpenders();
        console.log('InvoiceDashboard Constructor : ', this.props);
    }

    render() {
        return (
            <div>
                <InvoiceForm id="SideLayout"
                    stores={this.props.stores}
                    categories={this.props.categories}
                    spenders={this.props.spenders} />
               <div vertical stretch>
                  <ul>
                    <li><a href="/report">Report</a></li>
                    <li><a href="/stores">Stores</a></li>
                    <li><a href="/categories">Categories</a></li>
                  </ul>
              </div>
            </div>);
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
                }
            };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDashboard);
