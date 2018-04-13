import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import BookBrowser from './BookBrowser/BookBrowser';
import BookDetail from './BookDetail/BookDetail';

class Store extends Component {

    componentWillMount() {
        this.props.onFetchStore();
    }

    addToCartHandler = (id) => {
        this.props.onAddToCart(id,this.getBook(id));
        this.props.onUpdateBook(id);
    }

    goToItemDetailHandler = (id) => {
        this.props.history.push('store/' + id);
    }

    getBook(id) {
        return this.props.storeItems.find(book => book.id === id);
    }

    render() {
        return (
            <Switch>
                <Route
                    path='/store'
                    exact
                    render={(props) => <BookBrowser {...props}
                        onAddToCart={(id) => this.addToCartHandler(id)}
                        goToItem={(id) => this.goToItemDetailHandler(id)}
                        books={this.props.storeItems} />}
                />
                <Route
                    path={this.props.match.url + '/:id'}
                    render={(props) => <BookDetail {...props}
                        onAddToCart={(id) => this.addToCartHandler(id)}/>}
                />
            </Switch>
        );
    }
}


const mapStateToProps = state => {
    return {
        storeItems: state.store.storeItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchStore: () => dispatch(actions.fetchStoreItems()),
        onFetchBook: (bookId) => dispatch(actions.fetchBook(bookId)),
        onAddToCart: (bookId, bookData) => dispatch(actions.addToCart(bookId, bookData)),
        onUpdateBook: (bookId) => dispatch(actions.updateBook(bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
