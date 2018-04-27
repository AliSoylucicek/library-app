import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Rating, Icon, Label, Button } from 'semantic-ui-react';

import './BookDetail.css';
import ConfirmPortal from './ConfirmPortal/ConfirmPortal';
import * as actions from '../../../store/actions/index';
import ErrorHeader from '../../../components/UI/ErrorHeader/ErrorHeader';

class BookDetail extends Component {

    state = {
        open: false
    }

    componentWillMount() {
        this.props.onFetchBook(+this.props.match.params.id);
    }

    addToCartHandler() {
        this.props.onAddToCart(this.props.book.id, this.props.book);
        const books = [];
        books.push(this.props.book)
        this.props.onUpdateBook(books, "cart")
        this.props.onFetchBook(this.props.book.id);
        this.setState({ open: true })
    }

    toShopHandler = () => {
        this.props.history.push('/store');
    }

    toCartHandler = () => {
        this.props.history.push('/cart');
    }

    handleClose = () => this.setState({ open: false })

    render() {

        let bookDetail = (
            <ErrorHeader icon="warning sign" header="Oops!" subHeader="This item doesn't exist!" />
        );

        let oldPrice = "";

        if (this.props.book.oldPrice) {
            oldPrice = this.props.book.oldPrice + "  ";
        }

        let itemButton = (
            <Button as="div" floated="right" labelPosition='right' onClick={() => this.addToCartHandler()}>
                {this.props.book.oldPrice ? <s style={{ lineHeight: "2.5em", marginRight: "10px" }}>{oldPrice} </s> : null}
                <Button color="blue">
                    Add To Cart
                </Button>
                <Label basic color="blue" pointing="left">
                    {this.props.book.price}
                </Label>
            </Button>
        );

        const bookState = this.props.book.purchaseState;
        if(bookState !== "")
        {
            if (bookState === "cart")
            itemButton = <Button basic color="green" floated="right">Added to Cart</Button>
            else if(bookState === "purchased")
            itemButton = <Button basic color="green" floated="right">Purchased</Button>
        }
        

        if (this.props.book.hasOwnProperty('name')) {
            bookDetail = (
                <Item>
                    <Item.Image>
                        <Icon name="book" size="massive" fitted style={{ marginLeft: "20px" }} />
                    </Item.Image>

                    <Item.Content>
                        <Item.Header >{this.props.book.name}</Item.Header>
                        <Label style={{ marginLeft: "1em" }}>
                            {this.props.book.category}
                        </Label>

                        <Item.Meta>{this.props.book.author}</Item.Meta>
                        <Item.Description>
                            {this.props.book.description}
                        </Item.Description>

                        <Item.Extra>
                            <Rating icon='star' rating={this.props.book.rating} maxRating={5} />

                        </Item.Extra>
                        <Item.Extra>
                            {itemButton}
                        </Item.Extra>
                    </Item.Content>
                </Item>
            );
        }

        

        return (
            <div>
                <Item.Group>
                    <Button basic color="blue" onClick={this.toShopHandler} >
                        <Icon name="arrow left" />Back to Shop
                    </Button>
                    {bookDetail}
                </Item.Group>
                <ConfirmPortal
                book={this.props.book}
                open={this.state.open}
                handleClose={this.handleClose}
                shop={this.toShopHandler}
                cart={this.toCartHandler}
                />
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        book: state.store.currentBook,
        storeItems: state.store.storeItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBook: (id) => dispatch(actions.fetchBook(id)),
        onUpdateBook: (books, state) => dispatch(actions.updatePurchaseState(books, state)),
        onAddToCart: (bookId, bookData) => dispatch(actions.addToCart(bookId, bookData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);