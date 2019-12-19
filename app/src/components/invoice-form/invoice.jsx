import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import { Layout } from 'antd';
const { Content } = Layout;

import { addInvoice, REQUEST_STATUS } from './actions';
import SpendersList from './spenders-list.jsx';


const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
})

const dateFormat = 'YYYY/MM/DD';

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

    setInitialFormData() {
        this.state = {
            form: {
                category: '',
                store: '',
                date: new Date(),
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

    onDateClicked(d) {
      this.state.form.date = d //`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      this.setState(this.state);
    }

    setField(key, e) {
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
        const { form } = this.state
        this.resetFormWhenNeeded();
        return (
          <Layout vertical tokens={{ childrenGap: 10 }} styles={{ root: { width: '240px' } }}>
            <Content>
            {/* <Layout layout="{width: '236px', padding:'2px'}" vertical center> */}

                <AutoComplete
                    onSelect={this.setStore} 
                    dataSource={this.props.stores.map((e) => ({
                        key: e.name, text: e.name
                    }))}
                    value={form.store}
                />

                <AutoComplete
                    onSelect={this.setCategory} 
                    dataSource={this.props.categories.map((cat) => ({
                        key: cat.name, text: cat.name
                    }))}
                    value={form.category}
                />

                <DatePicker 
                    defaultValue={moment(form.date, dateFormat)} 
                    format={dateFormat} 
                    onChange={this.onDateClicke}
                />

                <InputNumber
                  label="Amout"
                  defaultValue="0.00"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  value={this.state.form.amount} 
                  onChange={this.setAmount.bind(this)}
                />

                <SpendersList
                  spenders={this.props.spenders}
                  onUpdate={this.updateSpenders}/>

                <Button onClick={(e) => this.addInvoice(e)} text="Save" />

            </Content>
          {/* </Layout> */}
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
                }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
