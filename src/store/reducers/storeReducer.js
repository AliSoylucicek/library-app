import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { categoryOptions } from '../../shared/filterOptions';

const initialState = {
    storeItems: [
        { id: 0, name: "A Hunter's Story", author: "Jackson Teller", category: 'Adventure', rating: 4, price: 5.49, description: "A book description.", purchaseState: "cart" },
        { id: 1, name: "To Be a Murderer", author: "Alice Frederic", category: 'Horror', rating: 3, price: 6.49, description: "A book description.", purchaseState: "purchased", oldPrice: 8.49 },
        { id: 2, name: "Superman's Life", author: "M.J. Watson", category: 'Action', rating: 5, price: 9.99, description: "A book description.", purchaseState: "" },
        { id: 3, name: "The White Tower", author: "Howard Stark", category: 'Fantasy', rating: 5, price: 7.49, description: "A book description.", purchaseState: "" },
        { id: 4, name: "The Woodcarver and the Day", author: "Pablo Escobar", category: 'Fantasy', rating: 3, price: 4.49, description: "A book description.", purchaseState: "" },
        { id: 5, name: "The Consuming Madman", author: "Han Solo", category: 'Horror', rating: 4, price: 7.99, description: "A book description.", purchaseState: "" },
        { id: 6, name: "Mountain's Thief", author: "Gandald the White", category: 'Adventure', rating: 5, price: 12.49, description: "A book description.", purchaseState: "" },

    ],
    fetchedItems: [],
    currentBook: {},
    totalPages: 0,
    loading: false
};

const fetchStoreItems = (state, action) => {
    const items = state.storeItems.length / 4 > 1 ? state.storeItems.slice(0, 5) : state.storeItems;
    return updateObject(state, {
        fetchedItems: items,
        totalPages: Math.round(state.storeItems.length / 4)
    })
}

export const filterStoreItems = (state, action) => {
    const storeItems = state.storeItems.slice();
    let pages = 0
    let items = storeItems;
    console.log(action.filterOptions);
    if (action.filterOptions.category !== "") {
        const category = categoryOptions[action.filterOptions.category - 1].text;
        items = items.filter(
            item => item.category === category
        );
    }

    if (action.filterOptions.sorting === "ascending") {
        items.sort((a, b) => a.price - b.price)
    }

    if (action.filterOptions.sorting === "descending") {
        items.sort((a, b) => b.price - a.price)
    }

    if (action.filterOptions.search !== "") {
        const reg = new RegExp(action.filterOptions.search, "i");
        items = items.filter(item => reg.test(item.name));
    }

    pages = Math.round(items.length / 4)

    if (action.filterOptions.page && pages > 1) {
        const page = action.filterOptions.page * 5;
        items = storeItems.slice(page - 5, page);
    }

    //console.log(items);
    return updateObject(state, {
        fetchedItems: items,
        totalPages: pages
    })
}

const filterStoreStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const filterStoreComplete = (state, action) => {
    return updateObject(state, { loading: false });
}

const updatePurchaseState = (state, action) => {
    const updatedBooks = state.storeItems.map(i => {
        let item = i;
        for (let book of action.books) {
            if (i.id === book.id) {
                item = {
                    ...item,
                    purchaseState: action.bookState
                };
            }
        }
        return item;
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
        case actionTypes.UPDATE_PURCHASE_STATE: return updatePurchaseState(state, action);
        default: return state;
    }
};

export default reducer;