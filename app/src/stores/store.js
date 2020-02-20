import { compose, createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { invoiceReducer } from '../components/invoice-form/reducers';
import { categoriesReducers, storesReducers, spendersReducers } from '../components/dashboard/reducers';

const composeStore = compose(
  applyMiddleware(thunkMiddleware),
)(createStore);

let reducers = combineReducers({
  form: invoiceReducer,
  categories: categoriesReducers,
  spenders: spendersReducers,
  stores: storesReducers
});

export default composeStore(reducers); //, initialState);
