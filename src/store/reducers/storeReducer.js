import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { categoryOptions } from '../../shared/filterOptions';

const initialState = {
    storeItems: [
        { id: 0, name: "A Hunter's Story", category: 'Adventure', rating: 4, price: 5.49, description: "A book description.", alreadyAdded: "true" },
        { id: 1, name: "To Be a Murderer", category: 'Horror', rating: 3, price: 8.49, description: "A book description.", alreadyAdded: "false" },
        { id: 2, name: "Superman's Life", category: 'Action', rating: 5, price: 9.99, description: "A book description.", alreadyAdded: "false" },
        { id: 3, name: "The White Tower", category: 'Fantasy', rating: 5, price: 7.49, description: "A book description.", alreadyAdded: "false" }
    ],
    fetchedItems: [],
    currentBook: {},
    loading: false
};

const fetchStoreItems = (state, action) => {
    return updateObject(state, {
        fetchedItems: state.storeItems
    })
}

export const filterStoreItems = (state, action) => {
    let items = [];
    if (action.filterOptions.category !== "") {
        const category = categoryOptions[action.filterOptions.category - 1].text;
        items = state.storeItems.filter(
            item => item.category === category
        );
       
    }else {
        items = state.storeItems
    }

    if(action.filterOptions.sorting === "ascending")
    {
        
        items.sort((a,b)=>a.price - b.price)
       
    }
    
    if(action.filterOptions.sorting === "descending")
    {
        
        items.sort((a,b)=>b.price - a.price)
    }

    console.log(items);

    return updateObject(state, {
        fetchedItems: items
    })
}

const filterStoreStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const filterStoreComplete = (state, action) => {
    return updateObject(state, { loading: false });
}

const updateBook = (state, action) => {
    const updatedBooks = state.storeItems.map(item => {
        if (item.id !== action.bookId) {
            return item;
        }
        
        return {
            ...item,
            alreadyAdded: "true"
        };
    });
    const updatedState = {
        storeItems: updatedBooks
    }
    return updateObject(state, updatedState);
}

const fetchBook = (state, action) => {
    const newBook = state.storeItems.find(book => book.id === action.bookId);
    return updateObject(state, { currentBook: newBook });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STORE_ITEMS: return fetchStoreItems(state, action);
        case actionTypes.FILTER_STORE_ITEMS: return filterStoreItems(state, action);
        case actionTypes.FILTER_STORE_START: return filterStoreStart(state, action);
        case actionTypes.FILTER_STORE_COMPLETE: return filterStoreComplete(state, action);
        case actionTypes.FETCH_BOOK: return fetchBook(state, action);
        case actionTypes.UPDATE_BOOK: return updateBook(state, action);
        default: return state;
    }
};

export default reducer;