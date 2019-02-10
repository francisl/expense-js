import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Classes, InputGroup } from '@blueprintjs/core';

import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
// import Layout from 'baer/dist/layouts/layout';

import { today } from '../../utils/date';
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
        return this.props.spenders.filter((s) => (s.selected === true));
    }

    toggleSelection(spenderId) {
      const spender = this.props.spenders.filter((s) => {
        return s.id === parseInt(spenderId);
      });
      if (spender && spender.length > 0) {
        spender[0].selected = !spender[0].selected;
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
                date: today(),
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
        console.info('submiting : ', this.state.form)
        // this.props.actions.addInvoice(this.state.form);
    }

    onDateClicked(d) {
      this.state.form.date = d.target.value
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
            <div layout="{width: '236px', padding:'2px'}">
            {/* vertical center> */}
                <StatusMessage request={this.props.form.request}/>

                <InputGroup className={`${Classes.LARGE} large-input`} required placeholder="Categories" list="CategoryList" value={this.state.form.category} onChange={this.setCategory} autoFocus={true} />
                <DataList list={this.props.categories} fieldId="CategoryList" listKey="name" />

                <InputGroup className={`${Classes.LARGE} large-input`} required placeholder="Store" list="StoreList" value={this.state.form.store} onChange={this.setStore}/>
                <DataList list={this.props.stores} fieldId="StoreList" listKey="name" />

                <FormGroup row>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue={today()}
                    onChange={this.onDateClicked2}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormGroup>
                

                <InputGroup className={`${Classes.LARGE} large-input`} required type="text" placeholder="Amount" value={this.state.form.amount} onChange={this.setAmount.bind(this)}/>

                <SpendersList
                  className="large-input"
                  spenders={this.props.spenders}
                  onUpdate={this.updateSpenders}/>

                <Button className="large-input" onClick={(e) => this.addInvoice(e)} variant="contained" color="primary">Save</Button>

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
