import fetch from 'isomorphic-fetch';

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
    const currMonth = form.date.getMonth()
    const month = currMonth+1; // singleDigits[currMonth] || currMonth+1;
    const day = form.date.getDate();
    const formatedDate = form.date.getFullYear() + '-' + month + '-' + day;

    return (dispatch, getState) => {
        fetch("/api/invoice/", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify({
                ...form,
                date: formatedDate
            })
        })
        .then((response) =>{
            if (response.status >= 400) {
                dispatch(errorInvoice(status, error));
                throw new Error('catgories fetch failed, ', r, e);
            }
            return response.json();
        }).then((data) => {
            dispatch(receiveInvoice(data));
        })
        dispatch(sentInvoice());
    };
}
