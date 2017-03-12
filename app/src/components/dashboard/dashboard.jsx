import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvoiceForm from '../invoice-form/invoice.jsx';
import { fetchCategories, fetchStores, fetchSpenders } from './actions';
import { Segment } from '../semantic-react/elements/segment';

class InvoiceDashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.fetchCategories();
        this.props.actions.fetchStores();
        this.props.actions.fetchSpenders();
        console.log('InvoiceDashboard Constructor : ', this.props)
    }

    render() {
      console.log('InvoiceDashboard render ...');
        return (
            <div className='container'>
      				<Segment id="invoiceFormSegment">
                <InvoiceForm
                    stores={this.props.stores}
                    categories={this.props.categories}
                    spenders={this.props.spenders} />
      				</Segment>
      				<div>
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
