import * as actionTypes from './actionTypes';

export const fetchStoreItems = () => {
    return {
        type: actionTypes.FETCH_STORE_ITEMS
    };
};

export const fetchBook = (id) => {
    return {
        type: actionTypes.FETCH_BOOK,
        bookId: id
    };
};

export const updateBook = (id) => {
    return {
        type: actionTypes.UPDATE_BOOK,
        bookId: id
    };
};


