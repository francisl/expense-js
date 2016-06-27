import $ from 'jquery';
export const ADD_INVOICE = 'ADD_INVOICE';

export const REQUEST_STATUS = {
    NOACTION: 'NOACTION',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

export const ADDED_INVOICE = 'ADDED_INVOICE';
function receiveInvoice(response) {
    return {
        type: ADDED_INVOICE,
        response
    };
}

export const ERROR_INVOICE = 'ERROR_INVOICE';
function errorInvoice(status, error) {
    return {
        type: ERROR_INVOICE,
        status,
        error
    };
}

export const POST_INVOICE = 'POST_INVOICE';
function sentInvoice(response) {
    return { type: POST_INVOICE };
}


export function addInvoice(form) {
    return (dispatch, getState) => {
        $.ajax({
            method: "POST",
            url: "/api/invoice/",
            contentType: 'application/json',
            data: JSON.stringify(form)
        }).success((results) => {
            dispatch(receiveInvoice(results));
        }).error((xhr, status, error) => {
            dispatch(errorInvoice(status, error));
        });
        dispatch(sentInvoice());
    };
}
