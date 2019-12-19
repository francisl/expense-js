import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { REQUEST_STATUS } from './actions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Message = (props) => {
  const Icon = variantIcon['success'];
  return <SnackbarContent
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar">
          <Icon />
          {props.message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={props.onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
}

export default (props) => {
  let toast;
  let toast2;
  function toastR(ref) {
    toast2 = ref;
  };

  switch(props.request.status){
      case REQUEST_STATUS.SUCCESS:
          return <Message 
              label="Close" 
              onClose={presetChoice} 
              message="Invoice created succesfully" 
          />
      case REQUEST_STATUS.PENDING:
        return <Message 
            label="Close" 
            onClose={presetChoice} 
            message="Pending..." 
        />
      case REQUEST_STATUS.ERROR:
        return <Message 
            label="Close" 
            onClose={presetChoice} 
            message= "Error Creating Invoice: {props.request.error.status} | {props.request.error.error}"
        />
  }

  if (toast2) {
    toast2.show({message: 'hey!'});
  } else {
    toast2 = <div></div>;
  }
  return toast2;
}
