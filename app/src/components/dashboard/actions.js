import $ from 'jquery';
import fetch from 'isomorphic-fetch';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const PENDING_CATEGORIES = 'PENDING_CATEGORIES';
function receiveCategories(categories) {
    if (categories === undefined){
        return {type: PENDING_CATEGORIES, categories: []};;
    }
    return {
        type: RECEIVE_CATEGORIES,
        categories
    };
}
export function fetchCategories(dispatch) {
    fetch("/api/category/")
        .then((response) =>{
            if (response.status >= 400) {
                throw new Error('catgories fetch failed, ', r, e);
            }
            return response.json();        
        }).then((data) => {
            dispatch(receiveCategories(data.categories));
        })
    return {type: PENDING_CATEGORIES, categories: []};
}

export const RECEIVE_STORES = 'RECEIVE_STORES';
function receiveStores(stores) {
    return {
        type: RECEIVE_STORES,
        stores
    };
}

export function fetchStores(dispatch) {
    fetch("/api/stores/")
    .then((response) =>{
        if (response.status >= 400) {
            throw new Error('stores fetch failed, ', r, e);
        }
        return response.json();        
    }).then((data) => {
        dispatch(receiveStores(data.stores));
    })

    return {type: null};
}

export const RECEIVE_SPENDERS = 'RECEIVE_SPENDERS';
function receiveSpenders(spenders) {
    return {
        type: RECEIVE_SPENDERS,
        spenders
    };
}

export function fetchSpenders(dispatch) {
    fetch("/api/spenders/")
    .then((response) =>{
        if (response.status >= 400) {
            throw new Error('spenders fetch failed, ', r, e);
        }
        return response.json();        
    }).then((data) => {
        dispatch(receiveSpenders(data));
    })

    return {type: null};
}
