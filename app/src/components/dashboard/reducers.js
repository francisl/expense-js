import {
    RECEIVE_CATEGORIES,
    RECEIVE_STORES,
    RECEIVE_SPENDERS } from './actions';

export function categoriesReducers (state, action) {
    if (typeof state === 'undefined') {
        return [];
    }
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            console.log('action categories state :::>>> ', state);
            console.log('action categories :::>>> ', action.categories);
            return action.categories;
        default:
            return state;
    }
}

export function storesReducers (state, action) {
    if (typeof state === 'undefined') {
        return [];
    }
    switch (action.type) {
        case RECEIVE_STORES:
            return action.stores;
        default:
            return state;
    }
}

export function spendersReducers (state, action) {
    if (typeof state === 'undefined') {
        return [];
    }
    switch (action.type) {
        case RECEIVE_SPENDERS:
            return action.spenders.spenders;
        default:
            return state;
    }
}
