import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Button, Item, Label, Icon } from 'semantic-ui-react';

import * as actions from '../../store/actions/orderActions';
import ErrorHeader from '../../components/UI/ErrorHeader/ErrorHeader';

class Cart extends Component {

    componentWillMount() {
        this.props.onFetchCart();
    }

    clickHandler = () => {
        this.props.history.push('store/')
    }

    removeHandler = (book) => {
        this.props.onRemoveItem(book.id, book);
    }

    render() {
        let component = (
            <ErrorHeader
                icon="shopping basket"
                header="Oops!"
                subHeader="Your shopping cart is empty, come back when you add some stuff!"
                link="Go To Shop!"
                onClick={this.clickHandler} />
        );
        let button = (
            <Button primary fluid onClick={()=>this.props.onPurchaseStart(this.props.cartItems)}>
                Buy Now!
            </Button>
        );

        if (this.props.cartItems.length > 0) {

            if (this.props.totalPrice > this.props.wallet) {
                button = (
                    <Button color="orange" fluid onClick={() => this.props.onAddFunds(50)}>
                        Add More Funds
                    </Button>
                )
            }

            let items = this.props.cartItems.map(book => (
                <Segment key={book.id}>
                    <Item.Group>
                        <Item>
                            <Item.Image>
                                <Icon name="book" size="massive" fitted />
                            </Item.Image>

                            <Item.Content >
                                <Item.Header >{book.name}</Item.Header>
                                <Label style={{ marginLeft: "1em" }}>
                                    {book.category}
                                </Label>
                                <Item.Description>
                                    {book.description}
                                </Item.Description>
                                <Item.Extra >
                                    <Label content={book.price} size="large" />
                                    <Button icon="close" floated="right" basic color="red" content="Remove" onClick={() => this.removeHandler(book)} />
                                </Item.Extra>

                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            ));

            component = (
                <Grid container stackable>
                    <Grid.Column width={4}>
                        <Segment>
                            <Header as='h3' textAlign='center'>
                                Total Price: {this.props.totalPrice}
                            </Header>
                            <Header as='h3' textAlign='center'>
                                Wallet: {this.props.wallet.toFixed()}
                            </Header>
                            {button}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment.Group >
                            {items}
                        </Segment.Group>
                    </Grid.Column>
                </Grid>
            );
        }
        return (
            <div>{component}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.order.cart,
        totalPrice: state.order.totalPrice,
        wallet: state.order.wallet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCart: () => dispatch(actions.fetchCartItems()),
        onPurchaseStart: (items) => dispatch(actions.purchaseItems(items)),
        onAddFunds: (funds) => dispatch(actions.addMoreFunds(funds)),
        onRemoveItem: (id, bookData) => dispatch(actions.removeItem(id, bookData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);