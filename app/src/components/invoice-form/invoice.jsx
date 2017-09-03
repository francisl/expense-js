import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addInvoice, REQUEST_STATUS } from './actions';
import { DataList } from '../semantic-react/datalist';
import { Message } from '../semantic-react/collections/message';
import SpendersList from './spenders-list.jsx';
import { InputGroup } from "@blueprintjs/core";

class StatusMessage extends Component {
    render(){
        switch(this.props.request.status){
            case REQUEST_STATUS.SUCCESS:
                return <Message className="green">Invoice created succesfully</Message>;
            case REQUEST_STATUS.PENDING:
                return <Message className="blue">Pending...</Message>;
            case REQUEST_STATUS.ERROR:
                return <Message className="red">
                    <p>Error Creating Invoice: {this.props.request.error.status} | {this.props.request.error.error}</p>
                </Message>;
            default:
                return <div></div>;
        }
    }
}

class InvoiceForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.setInitialFormData();
        this.setCategory = this.setField.bind(this, 'category');
        this.setStore = this.setField.bind(this, 'store');
    }

    setInitialFormData() {
        this.state = {
            form: {
                category: '',
                store: '',
                date: this.getToday(),
                amount: '',
                spenders: []
            },
            submited: false
        };
    }

    addInvoice(e) {
        e.preventDefault()
        this.setState({ ...this.state, submited: true });
        this.props.actions.addInvoice(this.state.form);
    }

    getToday(){
        const date = new Date;
        const singleDigits = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
        const currMonth = date.getMonth()
        const month = singleDigits[currMonth] || currMonth+1;
        const day = singleDigits[date.getDate()] || date.getDate();
        return date.getFullYear() + '-' + month + '-' + day
    }

    setField(key, e) {
        this.state.form[key] = e.target.value;
        this.state.form[key] = e.target.value;
        this.setState(this.state);
    }

    setAmount(e){
        var reg = /\d*\.\d\d/;
        var amount = e.target.value.replace(/[a-zA-Z]/, '');
        if (amount.length === 0 || /^\d+\.\d\d$/.test(amount) || /^\d+\.$/.test(amount) || /^\d+\.\d$/.test(amount) || /^\d+$/.test(amount) ){
            this.setState({ form: { ...this.state.form, amount }});
        }
    }

    updateSpenders(spenders) {
        this.setState({form: {...this.state.form, spenders}})
    }

    resetFormWhenNeeded(){
        if (this.state.submited && this.props.form.request.status == REQUEST_STATUS.SUCCESS){
            this.setInitialFormData();
        }
    }

    render() {
        this.resetFormWhenNeeded();

        return (
            <div>
                <h4>Add Invoice</h4>
                <StatusMessage request={this.props.form.request}/>
                <form className="ui form">
                    <InputGroup required placeholder="Categories" list="CategoryList" value={this.state.form.category} onChange={this.setCategory} autoFocus={true} />
                    <DataList list={this.props.categories} fieldId="CategoryList" listKey="name" />

                    <InputGroup required placeholder="Store" list="StoreList" value={this.state.form.store} onChange={this.setStore}/>
                    <DataList list={this.props.stores} fieldId="StoreList" listKey="name" />

                    <div className="field">
                        <input required type="date" placeholder="Date" value={this.state.form.date} onChange={this.setField.bind(this, 'date')}/>
                    </div>
                    <div className="field">
                        <input required type="text" placeholder="Amount" value={this.state.form.amount} onChange={this.setAmount.bind(this)}/>
                    </div>
                        <SpendersList className="" spenders={this.props.spenders} selected={this.state.form.spenders} onUpdate={this.updateSpenders.bind(this)}/>
                    <div className="field">
                        <button className="ui primary button" onClick={(e) => this.addInvoice(e)}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
} 

function mapStateToProps(state){
    return { form: state.form };
}

function mapDispatchToProps(dispatch, ownState) {
    return { actions: {
                    addInvoice: (form) => {
                        dispatch(addInvoice(form));
                    }
                }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
