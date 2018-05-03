import * as actionTypes from './actionTypes';

export const addToCart = (id, bookData) => {
    return {
        type: actionTypes.ADD_TO_CART,
        bookId: id,
        bookData: bookData
    };
};

export const removeItem = (id, bookData) => {
    const items = [bookData];
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_PURCHASE_STATE,
            books: items,
            bookState: ""
        })
        dispatch({
            type: actionTypes.REMOVE_ITEM,
            bookId: id,
            bookData: bookData
        })
    }
};

export const fetchCartItems = () => {
    return {
        type: actionTypes.FETCH_CART_ITEMS
    };
};

export const addMoreFunds = (funds) => {
    return {
        type: actionTypes.ADD_MORE_FUNDS,
        funds: funds
    };
};

export const purchaseItems = (items) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_PURCHASE_STATE,
            books: items,
            bookState: "purchased"
        })
        dispatch({ type: actionTypes.PURCHASE_ITEMS })
        
    }
};

export const purchaseSuccess = () => {
    return {
        type: actionTypes.PURCHASE_SUCCESS
    };
};

export const purchaseFail = () => {
    return {
        type: actionTypes.PURCHASE_FAIL
    };
};

export const fetchMyBooks = () => {
    return {
        type: actionTypes.FETCH_MY_BOOKS
    };
};



