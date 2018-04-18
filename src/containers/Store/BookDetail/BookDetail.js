import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Rating, Icon, Label, Button } from 'semantic-ui-react';

import './BookDetail.css';
import * as actions from '../../../store/actions/index';
import ErrorHeader from '../../../components/UI/ErrorHeader/ErrorHeader';

class BookDetail extends Component {


    componentWillMount() {
        this.props.onFetchBook(+this.props.match.params.id);
    }

    addToCartHandler() {
        this.props.onAddToCart(this.props.book.id,this.props.book);
        this.props.onUpdateBook(this.props.book.id)
        this.props.onFetchBook(this.props.book.id);
    }

    render() {

        let bookDetail = (
            <ErrorHeader icon="warning sign" header="Oops!" subHeader="This item doesn't exist!" />
        );

        let itemButton = (
            <Button as="div" floated="right" labelPosition='right' onClick={() => this.addToCartHandler()}>
                <Button color="blue">
                    Add To Cart
            </Button>
                <Label basic color="blue" pointing="left">
                    {this.props.book.price}
                </Label>
            </Button>
        );

        if (this.props.book.alreadyAdded === "true")
            itemButton = <Button basic color="green" floated="right">Added to Cart</Button>

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
            <Item.Group>{bookDetail}</Item.Group>
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
        onUpdateBook: (id) => dispatch(actions.updateBook(id)),
        onAddToCart: (bookId, bookData) => dispatch(actions.addToCart(bookId, bookData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);