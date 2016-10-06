import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addInvoice, REQUEST_STATUS } from './actions';
import { DataList } from '../semantic-react/datalist';
import { Message } from '../semantic-react/collections/message';

class SpendersList extends Component {
    constructor(props, context){
        super(props, context);
        this.state = { spenders: new Set()};
    }

    toggleSpenders(e) {
        if (e.target.checked){
            this.state.spenders.add(e.target.value);
        } else {
            this.state.spenders.delete(e.target.value);
        }

        this.setState(this.state);
        this.props.onUpdate(Array.from(this.state.spenders));
    }

    render() {
        return <div className="inline field">
                    { this.props.spenders.map(
                        (s) => {
                            return <div className="ui checkbox" onChange={this.toggleSpenders.bind(this)}>
                                <input type="checkbox" name="spenders" value={s.id} />
                                <label>{s.name}</label>
                            </div>;
                        })
                    }
            </div>;
        }
}


class StatusMessage extends Component {
    render(){
        console.debug('status : ', this.props.request.status);
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
    }

    setInitialFormData() {
        this.state = {
            form: {
                category: '',
                store: '',
                date: this.getToday(),
                amount: ''
            },
            submited: false
        };
    }

    addInvoice() {
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
        console.log('set field change ', key );
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
        console.log('props : ', this.props.form.request);
        this.resetFormWhenNeeded();
        return (
            <div>
                <h4>Add Invoice</h4>
                <StatusMessage request={this.props.form.request}/>
                <form className="ui form">
                    <div className="field">
                        <input required type="text" autoFocus={true} list="CategoryList" placeholder="Category" value={this.state.form.category} onChange={this.setField.bind(this, 'category')}/>
                    </div>
                    <div className="field">
                        <DataList list={this.props.categories} fieldId="CategoryList" listKey="name" />
                    </div>
                    <div className="field">
                        <input required type="text" list="StoreList" placeholder="Store" value={this.state.form.store} onChange={this.setField.bind(this, 'store')}/>
                    </div>
                    <div className="field">
                        <DataList list={this.props.stores} fieldId="StoreList" listKey="name" />
                    </div>
                    <div className="field">
                        <input required type="date" placeholder="Date" value={this.state.form.date} onChange={this.setField.bind(this, 'date')}/>
                    </div>
                    <div className="field">
                        <input required type="text" placeholder="Amount" value={this.state.form.amount} onChange={this.setAmount.bind(this)}/>
                    </div>
                        <SpendersList className="" spenders={this.props.spenders} onUpdate={this.updateSpenders.bind(this)}/>
                    <div className="field">
                        <button type="submit" className="ui primary button" onClick={() => this.addInvoice()}>Save</button>
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
