import {
    ADDED_INVOICE,
    POST_INVOICE,
    ERROR_INVOICE,
    REQUEST_STATUS } from './actions';



 export function invoiceReducer (state, action) {
     if (typeof state === 'undefined') {
         return {request: { status: REQUEST_STATUS.NOACTION}};
     }
     switch (action.type) {
         case ADDED_INVOICE:
            return Object.assign({}, state, {
                request: {
                    status: REQUEST_STATUS.SUCCESS
                }
            });
        case POST_INVOICE:
            return Object.assign({}, state, {
                request: {
                    status: REQUEST_STATUS.PENDING
                }
            });
        case ERROR_INVOICE:
            return Object.assign({}, state, {
                request: {
                    status: REQUEST_STATUS.ERROR,
                    error: { status: action.status, error: action.error }
                }
            });
         default:
            return state;
     }
 }
