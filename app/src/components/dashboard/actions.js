import $ from 'jquery';

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
    $.ajax({ method: "GET", url: "/api/category/",})
    .success(function(result){
        dispatch(receiveCategories(result.categories));})
    .error((r, e) => {
        console.log('catgories fetch failed, ', r, e);
    });
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
    $.ajax({
      method: "GET",
      url: "/api/stores/",
    }).success(function(result){
        dispatch(receiveStores(result.stores));
    }).error((r) => {
        console.log('stores fetch failed');
    });
    return {type: null};
}

// export const REQUEST_SPENDERS = 'REQUEST_SPENDERS'
// function requestSpenders() {
//     return {
//         type: REQUEST_SPENDERS
//     };
// }

export const RECEIVE_SPENDERS = 'RECEIVE_SPENDERS';
function receiveSpenders(spenders) {
    return {
        type: RECEIVE_SPENDERS,
        spenders
    };
}

export function fetchSpenders(dispatch) {
    $.ajax({
        method: "GET",
        url: "/api/spenders/",
    }).success(function(results){
        dispatch(receiveSpenders(results));
        // actions.spenders.fetchSpenders(result.spenders);
    }).error((r) => {
        console.log('spenders fetch failed');
    });
    return {type: null};
}
