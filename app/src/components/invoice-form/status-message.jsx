import React from 'react';
import { Component } from 'react';
import { Message } from '../semantic-react/collections/message';
import { REQUEST_STATUS } from './actions';

export default (props) => {
  switch(props.request.status){
      case REQUEST_STATUS.SUCCESS:
          return <Message className="green">Invoice created succesfully</Message>;
      case REQUEST_STATUS.PENDING:
          return <Message className="blue">Pending...</Message>;
      case REQUEST_STATUS.ERROR:
          return <Message className="red">
              <p>Error Creating Invoice: {props.request.error.status} | {props.request.error.error}</p>
          </Message>;
      default:
          return <div></div>;
  }
}
