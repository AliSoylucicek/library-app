import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Rating, Icon, Label, Button, Grid, Container, Segment } from 'semantic-ui-react';

import './BookDetail.css';
import ConfirmPortal from './ConfirmPortal/ConfirmPortal';
import * as actions from '../../../store/actions/index';
import ErrorHeader from '../../../components/UI/ErrorHeader/ErrorHeader';

class BookDetail extends Component {

    state = {
        open: false,
        book: []
    }

    constructor(props) {
        super(props);
        this.props.onFetchBook(+this.props.match.params.id);
    }

    addToCartHandler() {
        this.props.onAddToCart(this.props.book.id, this.props.book);
        const books = [];
        books.push(this.props.book)
        this.props.onUpdateBook(books, "cart")
        this.props.onFetchBook(+this.props.book.id);
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

        let purchasePanel;
        let book;

        if (this.props.book) {
            console.log(this.props.book);
            let oldPrice = "";

            if (this.props.book.oldPrice) {
                oldPrice = this.props.book.oldPrice + "  ";
            }

            let cartButton = (
                <Button color="blue" fluid onClick={() => this.addToCartHandler()}>
                    <Icon name="shopping bag" />
                    Add to Cart
                </Button>
            );

            let favouriteButton = (
                <Button color="red" fluid>
                    <Icon name="heart" />
                    Add to Favourites
            </Button>
            );

            const bookState = this.props.book.purchaseState;
            if (bookState !== "") {
                if (bookState === "cart")
                    cartButton = <Button basic color="blue" fluid disabled>Added to Cart</Button>
                else if (bookState === "purchased")
                    cartButton = <Button basic color="green" fluid disabled>Purchased</Button>
            }

            purchasePanel = (
                <Segment style={{ height: "100%" }} textAlign="center">
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        {this.props.book.oldPrice ? <h3 style={{ textDecoration: "line-through", marginBottom: "0px", marginTop: "5px" }}>{oldPrice} $</h3> : null}
                        <h2 style={{ marginTop: "0px" }}>{this.props.book.price} $</h2>
                    </div>
                    <br />
                    {cartButton}
                    <br />
                    {favouriteButton}
                </Segment>
            );

            

            if (this.props.book.hasOwnProperty('name')) {
                book = (
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
                                <Rating icon='star' rating={this.props.book.rating} maxRating={5} disabled />

                            </Item.Extra>
                            {/* <Item.Extra>
                                {cartButton}
                            </Item.Extra>
                            <Item.Extra>
                                {favouriteButton}
                            </Item.Extra> */}
                        </Item.Content>
                    </Item>
                );

                bookDetail = (
                    <Container fluid>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Item.Group>
                                        <Button basic color="blue" onClick={this.toShopHandler} >
                                            <Icon name="arrow left" />Back to Shop
                                </Button>
                                        {book}
                                    </Item.Group>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    {purchasePanel}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <ConfirmPortal
                            header="Added to Cart!"
                            books={[this.props.book]}
                            open={this.state.open}
                            handleClose={this.handleClose}
                            primaryButton="Go to Shop"
                            secondaryButton="Go to Cart"
                            primary={this.toShopHandler}
                            secondary={this.toCartHandler}
                        />
                    </Container>
                );
            }
        }

        return (
            <div>
                {bookDetail}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        book: state.store.currentBook
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