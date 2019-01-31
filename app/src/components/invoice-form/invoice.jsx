import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Classes, InputGroup } from '@blueprintjs/core';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
// import Layout from 'baer/dist/layouts/layout';

import { addInvoice, REQUEST_STATUS } from './actions';
import { DataList } from '../semantic-react/datalist';
import SpendersList from './spenders-list.jsx';
import StatusMessage from './status-message';

class InvoiceForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.setInitialFormData();
        this.setCategory = this.setField.bind(this, 'category');
        this.setStore = this.setField.bind(this, 'store');
        this.updateSpenders = this.updateSpenders.bind(this);
        this.onDateClicked = this.onDateClicked.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      // set default to first spenders if no selection
      if (nextProps.spenders !== this.props.spenders && nextProps.spenders.length > 0) {
        nextProps.spenders[0].selected = true;
      }
    }

    getSelectedSpenders() {
        return _.filter(this.props.spenders, (s) => (s.selected === true));
    }

    toggleSelection(spenderId) {
      const spender = _.find(this.props.spenders, (s) => {
        return s.id === parseInt(spenderId);
      });
      if (spender) {
        spender.selected = !spender.selected;
      }
    }

    updateSpenders(e) {
      this.toggleSelection(e.target.value);
      this.setState({form: {...this.state.form, spenders: this.getSelectedSpenders()}});
    }

    setInitialFormData() {
        this.state = {
            form: {
                category: '',
                store: '',
                date: this.getToday(),
                amount: '',
            },
            submited: false
        };
    }

    addInvoice(e) {
        e.preventDefault()
        this.state.form.spenders = this.props.spenders.filter(s => {
          return s.selected === true;
        }).map(s => (s.id));

        this.setState({ ...this.state, submited: true });
        this.props.actions.addInvoice(this.state.form);
    }

    getToday(){
        const date = new Date;
        const currMonth = date.getMonth()
        const month = currMonth+1; // singleDigits[currMonth] || currMonth+1;
        const day = date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    }

    onDateClicked(d) {
      this.state.form.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      this.setState(this.state);
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

    resetFormWhenNeeded(){
        if (this.state.submited && this.props.form.request.status == REQUEST_STATUS.SUCCESS){
            this.setInitialFormData();
        }
    }

    render() {
        this.resetFormWhenNeeded();
        console.log('props spenders : ', this.props.spenders);
        console.log('spenders : ', this.state.form.spenders);
        return (
            <div layout="{width: '236px', padding:'2px'}" vertical center>
                <StatusMessage request={this.props.form.request}/>

                <InputGroup className={`${Classes.LARGE} large-input`} required placeholder="Categories" list="CategoryList" value={this.state.form.category} onChange={this.setCategory} autoFocus={true} />
                <DataList list={this.props.categories} fieldId="CategoryList" listKey="name" />

                <InputGroup className={`${Classes.LARGE} large-input`} required placeholder="Store" list="StoreList" value={this.state.form.store} onChange={this.setStore}/>
                <DataList list={this.props.stores} fieldId="StoreList" listKey="name" />

                <DayPicker value={this.state.form.date} onDayClick={this.onDateClicked} selectedDays={new Date()}/>
                <InputGroup className={`${Classes.LARGE} large-input`} required type="text" placeholder="Amount" value={this.state.form.amount} onChange={this.setAmount.bind(this)}/>

                <SpendersList
                  className="large-input"
                  spenders={this.props.spenders}
                  onUpdate={this.updateSpenders}/>

                <Button className="large-input" onClick={(e) => this.addInvoice(e)} text="Save" />

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
