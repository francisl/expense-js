import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';

import { addInvoice, REQUEST_STATUS } from './actions';
import SpendersList from './spenders-list.jsx';
import StatusMessage from './status-message';

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
})

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
          <Container vertical tokens={{ childrenGap: 10 }} styles={{ root: { width: '240px' } }}>
            {/* <Layout layout="{width: '236px', padding:'2px'}" vertical center> */}
                <StatusMessage request={this.props.form.request}/>

                <Autocomplete
                    label="Store"
                    placeholder=""
                    allowFreeform
                    autoComplete="on"
                    onChange={this.setStore} 
                    options={this.props.stores.map((e) => ({
                        key: e.name, text: e.name
                    }))}
                    selectedKey={form.store}
                />

                <Autocomplete
                    label="Category"
                    placeholder=""
                    allowFreeform
                    autoComplete="on"
                    onChange={this.setCategory} 
                    options={this.props.categories.map((cat) => ({
                        key: cat.name, text: cat.name
                    }))}
                    selectedKey={form.category}
                />

                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={form.date}
                    onChange={this.onDateClicke}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />

                <TextField
                  label="Amout"
                  placeholder="0.00" 
                  value={this.state.form.amount} 
                  onChange={this.setAmount.bind(this)}
                />

                <SpendersList
                  spenders={this.props.spenders}
                  onUpdate={this.updateSpenders}/>

                <Button onClick={(e) => this.addInvoice(e)} text="Save" />

          {/* </Layout> */}
          </Container>
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
