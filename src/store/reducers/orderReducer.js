import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cart: [
        { id: 0, name: "A Hunter's Story", category: 'Adventure', rating: 4, price: 5.49, description: "A book description.", alreadyAdded: "true" }
    ],
    myBooks: [
        { id: 1, name: "To Be a Murderer", author: "Alice Frederic", category: 'Horror', rating: 3, price: 6.49, description: "A book description.", purchaseState: "", oldPrice: 8.49 }

    ],
    itemCount: 1,
    totalPrice: 5.49,
    wallet: 5
};

const addToCart = (state, action) => {
    const newPrice = state.totalPrice + action.bookData.price;
    console.log(action.bookData);
    return updateObject(state, {
        cart: state.cart.concat(action.bookData),
        itemCount: state.itemCount + 1,
        totalPrice: newPrice
    })
}

const removeItem = (state, action) => {
    const newPrice = state.totalPrice - action.bookData.price;
    const newCart = state.cart.filter(item => item.id !== action.bookId);
    return updateObject(state, {
        cart: newCart,
        itemCount: state.itemCount - 1,
        totalPrice: newPrice
    })

}

const fetchCartItems = (state, action) => {
    return updateObject(state, {
        cart: state.cart
    })
}

const purchaseItems = (state, action) => {
    console.log("Total price to be purchased: " + state.totalPrice);
    if (state.wallet >= state.totalPrice) {
        state.wallet -= state.totalPrice;
        console.log("Purchase is successful");
        return purchaseSuccess(state, action);
    }
    else {
        console.log("Insufficient funds!");
        return purchaseFail(state, action);
    }

}

const purchaseSuccess = (state, action) => {
    const newMyBooks = state.myBooks.concat(state.cart);
    
    return updateObject(state, {
        cart: [],
        myBooks: newMyBooks,
        itemCount: 0,
        totalPrice: 0
    })
}

const purchaseFail = (state, action) => {
    return state;
}

const addMoreFunds = (state, action) => {
    return updateObject(state, {
        wallet: state.wallet + action.funds
    });
}

const fetchMyBooks = (state, action) => {
    return updateObject(state, {
        myBooks: state.myBooks
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        case actionTypes.FETCH_CART_ITEMS: return fetchCartItems(state, action);
        case actionTypes.ADD_MORE_FUNDS: return addMoreFunds(state, action);
        case actionTypes.PURCHASE_ITEMS: return purchaseItems(state, action);
        case actionTypes.FETCH_MY_BOOKS: return fetchMyBooks(state, action);
        default: return state;
    }
};

export default reducer;