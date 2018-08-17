import React from 'react';
import { Component } from 'react';
import { Position, Toaster } from '@blueprintjs/core';
import { Message } from '../semantic-react/collections/message';
import { REQUEST_STATUS } from './actions';

export default (props) => {
  let toast;
  let toast2;
  function toastR(ref) {
    toast2 = ref;
  };

  switch(props.request.status){
      case REQUEST_STATUS.SUCCESS:
          <Toaster position={Position.BOTTOM_LEFT} ref={toastR} message="Invoice created succesfully" />
          // return <Message className="green"></Message>;
      case REQUEST_STATUS.PENDING:
          <Toaster position={Position.BOTTOM_LEFT} ref={toastR} message="Pending..." />
          // return <Message className="blue">Pending...</Message>;
      case REQUEST_STATUS.ERROR:
          <Toaster position={Position.BOTTOM_LEFT} ref={toastR} message="Error Creating Invoice: {props.request.error.status} | {props.request.error.error}" />
          // return <Message className="red">
          //     <p>Error Creating Invoice: {props.request.error.status} | {props.request.error.error}</p>
          // </Message>;
  }
  if (toast2) {
    toast2.show({message: 'hey!'});
  } else {
    toast2 = <div></div>;
  }
  return toast2;
}
