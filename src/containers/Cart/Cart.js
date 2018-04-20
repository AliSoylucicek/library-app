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
            <Button primary fluid onClick={this.props.onPurchaseStart}>
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
                                Wallet: {this.props.wallet}
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
        onPurchaseStart: () => dispatch(actions.purchaseItems()),
        onAddFunds: (funds) => dispatch(actions.addMoreFunds(funds))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);