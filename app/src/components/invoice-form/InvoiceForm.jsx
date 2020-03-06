import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {AutoComplete, Button, DatePicker, InputNumber, Layout } from 'antd';
import dayjs from 'dayjs';
import { addInvoice, REQUEST_STATUS } from './actions';
import SpendersList from './spenders-list.jsx';

// const dateFormat = 'YYYY-MM-DD';

class InvoiceForm extends Component {
  state = {
    form: {
      category: '',
      store: '',
      date: new Date(),
      amount: '',
    },
    category: {},
    store: {},
    submited: false
  };

  constructor(props, context) {
    super(props, context);
    this.updateSpenders = this.updateSpenders.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }
  
  getSelectedSpenders() {
    return this.props.spenders.filter(s => (s.selected === true));
  }
  
  toggleSelection(spenderId) {
    const spender = this.props.spenders.find(s => {
      return s.id === parseInt(spenderId);
    });
    if (spender) {
      spender.selected = !spender.selected;
    }
  }
  
  updateSpenders(e, checked) {
    this.toggleSelection(e.target.id);
    this.setState({form: {...this.state.form, spenders: this.getSelectedSpenders()}});
  }

  addInvoice(e) {
    e.preventDefault()
    this.state.form.spenders = this.props.spenders.filter(s => {
      return s.selected === true;
    }).map(s => (s.id));
    
    this.setState({ ...this.state, submited: true });
    this.props.actions.addInvoice(this.state.form);
  }
  
  onDateClicked = (d) => {
    this.state.form.date = d //`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    this.setState(this.state);
  }
  
  setField(key, value, option) {
    console.log('k : ', key, ' value : ', value, ' option : ', option);
    this.state[key] = option;
    this.state.form[key] = option.key;
    this.setState(this.state);
  }
  
  setAmount = (value) => {
    var amount = `${value}`.replace(/[a-zA-Z]/, '');
    if (amount.length === 0 || /^\d+\.\d\d$/.test(amount) || /^\d+\.$/.test(amount) || /^\d+\.\d$/.test(amount) || /^\d+$/.test(amount) ){
      this.setState({ form: { ...this.state.form, amount }});
    }
  }
  
  resetFormWhenNeeded(){
    if (this.state.submited && this.props.form.request.status == REQUEST_STATUS.SUCCESS){
      this.setInitialFormData();
    }
  }

  optionsList = (optionsList) => optionsList.map((option) => ({
    key: `${option.id}`, value:  `${option.id}`, label: option.name
  }))
  
  render() {
    const { category, store } = this.state
    const { categories } = this.props
    this.resetFormWhenNeeded();
    
    const stores = this.optionsList(this.props.stores)
    console.log('stores : ', stores)

    return (
      <Layout 
        className="sider-layout"
        styles={{ 
          width: '240px',
        }}
      >
        <AutoComplete
          onSelect={(value, option) => {
            this.setField('store', value, option)
          }}
          options={stores}
          value={store.label}
          placeholder='Store'
        />
        
        <AutoComplete
          options={this.optionsList(categories)}
          onSelect={(value, option) => {
            this.setField('category', value, option)
          }}
          value={category.label}
          placeholder='Category'
        />
        
        <DatePicker 
          defaultValue={dayjs(new Date())}
          onChange={this.onDateClicked}
        />
        
        <InputNumber
          label="Amout"
          defaultValue="0.00"
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          value={this.state.form.amount} 
          onChange={this.setAmount}
        />
        
        <SpendersList
          spenders={this.props.spenders}
          onUpdate={this.updateSpenders}/>
        
        <Button onClick={(e) => this.addInvoice(e)} value="Save" />
      </Layout>
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
  }};
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
