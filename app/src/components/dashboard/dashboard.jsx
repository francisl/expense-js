import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceForm from '../invoice-form/invoice';
import { fetchCategories, fetchStores, fetchSpenders } from './actions';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

class InvoiceDashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.fetchCategories();
        this.props.actions.fetchStores();
        this.props.actions.fetchSpenders();
    }

    render() {
        return (<Stack vertical tokens={{ childrenGap: 5 }}>
            <InvoiceForm id="SideLayout"
                stores={this.props.stores}
                categories={this.props.categories}
                spenders={this.props.spenders} />
            <Stack vertical align="stretch">
                <ul>
                    <li><a href="/report">Report</a></li>
                    <li><a href="/stores">Stores</a></li>
                    <li><a href="/categories">Categories</a></li>
                </ul>
            </Stack>
        </Stack>);
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
