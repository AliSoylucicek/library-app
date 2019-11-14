import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Card, Button, Icon } from 'semantic-ui-react';

import * as actions from '../../store/actions/index';
import BrowserBook from '../../components/BrowserBook/BrowserBook';

import { categoryOptions } from '../../shared/filterOptions';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.props.onFetchStore();
    }

    cardClickHandler = (categoryText) => {
        this.props.history.push('/store?category=' + categoryText);
    }

    goToItemDetailHandler = (id) => {
        this.props.history.push('/store/' + id);
    }

    toShopHandler = () => {
        this.props.history.push('/store');
    }

    render() {
        let categories = (
            <Grid columns="equal" stackable>
                {categoryOptions.map(category => (
                    <Grid.Column key={category.key}>
                        <Card
                            fluid
                            color={category.color}
                            onClick={() => { this.cardClickHandler(category.text) }}>
                            <Card.Content>
                                <Card.Header textAlign="center">
                                    {category.text}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                ))}

            </Grid>
        );

        let top10Books = (
            <Grid columns="equal" stackable>
                {this.props.storeItems.map(book => (
                    <Grid.Column key={book.id}>
                        <BrowserBook
                            key={book.id}
                            name={book.name}
                            author={book.author}
                            category={book.category}
                            price={book.price}
                            rating={book.rating}
                            purchaseState={book.purchaseState}
                            oldPrice={book.oldPrice}
                            detailClicked={() => this.goToItemDetailHandler(book.id)} />
                    </Grid.Column>
                ))}
            </Grid>
        );

        return (
            <Container fluid>
                <Header style={{ paddingTop: "1rem" }}>Categories</Header>
                {categories}
                <Grid columns="2">
                    <Grid.Column>
                        <Header style={{ paddingTop: "1rem" }}>Top Popular</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Button floated="right" basic color="blue" onClick={this.toShopHandler}>
                            See all <Icon name="arrow right" />
                        </Button>
                    </Grid.Column>
                </Grid>
                {top10Books}


            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        storeItems: state.store.fetchedItems,
        loading: state.store.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchStore: () => dispatch(actions.fetchStoreItems())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);