import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { categoryOptions } from '../../shared/filterOptions';

const initialState = {
    storeItems: [
        { id: 0, name: "A Hunter's Story", category: 'Adventure', rating: 4, price: 5.49, description: "A book description.", alreadyAdded: "true" },
        { id: 1, name: "To Be a Murderer", category: 'Horror', rating: 3, price: 6.49, description: "A book description.", alreadyAdded: "false", oldPrice: 8.49 },
        { id: 2, name: "Superman's Life", category: 'Action', rating: 5, price: 9.99, description: "A book description.", alreadyAdded: "false" },
        { id: 3, name: "The White Tower", category: 'Fantasy', rating: 5, price: 7.49, description: "A book description.", alreadyAdded: "false" },
        { id: 4, name: "The Woodcarver and the Day", category: 'Fantasy', rating: 3, price: 4.49, description: "A book description.", alreadyAdded: "false" },
        { id: 5, name: "The Consuming Madman", category: 'Horror', rating: 4, price: 7.99, description: "A book description.", alreadyAdded: "false" },
        { id: 6, name: "Mountain's Thief", category: 'Adventure', rating: 5, price: 12.49, description: "A book description.", alreadyAdded: "false" },
        
    ],
    fetchedItems: [],
    currentBook: {},
    totalPages: 0,
    loading: false
};

const fetchStoreItems = (state, action) => {
    const items = state.storeItems.length / 4 > 1 ? state.storeItems.slice(0,5) : state.storeItems;
    return updateObject(state, {
        fetchedItems: items,
        totalPages: Math.round(state.storeItems.length / 4)
    })
}

export const filterStoreItems = (state, action) => {
    const storeItems = state.storeItems.slice();
    let items = storeItems;
    if (action.filterOptions.category !== "") {
        const category = categoryOptions[action.filterOptions.category - 1].text;
        items = storeItems.filter(
            item => item.category === category
        );
    }

    if(action.filterOptions.sorting === "ascending")
    {
        items.sort((a,b)=>a.price - b.price)
    }
    
    if(action.filterOptions.sorting === "descending")
    {
        items.sort((a,b)=>b.price - a.price)
    }

    if(action.filterOptions.page){
        const page = action.filterOptions.page * 5;
        items = storeItems.slice(page-5,page);
    }

    console.log(action.filterOptions);

    if(action.filterOptions.search !== ""){
        const reg = new RegExp(action.filterOptions.search, "i");
        items = items.filter(item => reg.test(item.name));
    }

    //console.log(items);
    return updateObject(state, {
        fetchedItems: items,
        totalPages: Math.round(items.length / 4)
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