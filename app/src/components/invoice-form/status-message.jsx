import React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

import { REQUEST_STATUS } from './actions';

export default (props) => {
  let toast;
  let toast2;
  function toastR(ref) {
    toast2 = ref;
  };

  switch(props.request.status){
      case REQUEST_STATUS.SUCCESS:
          return <MessageBar 
            messageBarType={MessageBarType.success} 
            isMultiline={false} 
            onDismiss={p.resetChoice} 
            dismissButtonAriaLabel="Close"
            ref={toastR} 
          >
            Invoice created succesfully
          </MessageBar>
          
      case REQUEST_STATUS.PENDING:
          return <MessageBar 
              messageBarType={MessageBarType.error} 
              isMultiline={false} 
              onDismiss={p.resetChoice} 
              dismissButtonAriaLabel="Close"
              ref={toastR} 
          >
              Pending...
        </MessageBar>
      case REQUEST_STATUS.ERROR:
          return <MessageBar 
              messageBarType={MessageBarType.error} 
              isMultiline={false} 
              onDismiss={p.resetChoice} 
              dismissButtonAriaLabel="Close"
              ref={toastR} 
          >
              Error Creating Invoice: {props.request.error.status} | {props.request.error.error}
          </MessageBar>
  }

  if (toast2) {
    toast2.show({message: 'hey!'});
  } else {
    toast2 = <div></div>;
  }
  return toast2;
}
