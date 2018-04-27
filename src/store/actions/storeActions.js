import * as actionTypes from './actionTypes';

export const fetchStoreItems = () => {
    return {
        type: actionTypes.FETCH_STORE_ITEMS
    };
};

export const filterStore = (filterOptions) => {
    return {
        type: actionTypes.FILTER_STORE_ITEMS,
        filterOptions: filterOptions
    };
}

export const filterStoreItems = (filterOptions) => {
    return dispatch => {
        dispatch(filterStoreStart())
        setTimeout(() => {
            dispatch(filterStore(filterOptions));
            dispatch(filterStoreComplete());
        }, 1000);
    };
};

const filterStoreStart = () => {
    return { type: actionTypes.FILTER_STORE_START };
}

const filterStoreComplete = () => {
    return { type: actionTypes.FILTER_STORE_COMPLETE };
}

export const fetchBook = (id) => {
    return {
        type: actionTypes.FETCH_BOOK,
        bookId: id
    };
};

export const updatePurchaseState = (books, state) => {
    return {
        type: actionTypes.UPDATE_PURCHASE_STATE,
        books: books,
        bookState: state
    };
};


