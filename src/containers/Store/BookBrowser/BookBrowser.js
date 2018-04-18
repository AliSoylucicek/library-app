import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Select, Segment, Button, Form, Dimmer, Loader, Icon } from 'semantic-ui-react';

import './BookBrowser.css';

import * as actions from '../../../store/actions/index';
import { categoryOptions, sortOptions } from '../../../shared/filterOptions';
import { updateObject } from '../../../shared/utility';
import BrowserBook from '../../../components/BrowserBook/BrowserBook';

class BookBrowser extends Component {

    state = {
        filterOptions: {
            category: "",
            sorting: ""
        }
    }

    componentWillMount() {
        this.props.onFetchStore();
    }

    goToItemDetailHandler = (id) => {
        this.props.history.push('store/' + id);
    }

    handleFilter = () => {
        console.log(this.state.filterOptions);

        this.props.onFilterBooks(this.state.filterOptions)
    }

    sortSelectionHandler = (e, { value }) => {
        const updatedOptions = updateObject(this.state.filterOptions, { sorting: value === 1 ? "ascending" : "descending" });
        this.setState({ filterOptions: updatedOptions }, () => {
            console.log(this.state);
            this.props.onFilterBooks(this.state.filterOptions)
        })
    }

    handleReset = () => {
        this.setState({ filterOptions: { category: "" } });
        this.props.onFetchStore();
    }

    handleSelection = (e, { value }) => {
        const updatedOptions = updateObject(this.state.filterOptions, { category: value });
        this.setState({ filterOptions: updatedOptions });
    }


    render() {
        return (
            <Grid as={Container}>
                <Grid.Column mobile={16} tablet={4} computer={3}>
                    <Segment raised>
                        <Form>
                            <Form.Field
                                control={Select}
                                options={categoryOptions}
                                placeholder="Choose"
                                onChange={this.handleSelection}
                                label="Category"
                                selectOnBlur={false}
                                fluid
                                value={this.state.filterOptions.category} />
                            <Form.Field control={Button} fluid primary onClick={this.handleFilter} loading={this.props.loading} disabled={this.props.loading}>Filter</Form.Field>
                            <Form.Field control={Button} fluid onClick={this.handleReset} disabled={this.props.loading}>Reset</Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={12} computer={13}>
                    <Segment attached="top">
                        <Select options={sortOptions} placeholder="Sort Options" selectOnBlur={false} onChange={this.sortSelectionHandler}>
                        </Select>
                    </Segment>
                    <Grid as={Segment} attached="bottom" stackable>
                        {this.props.storeItems.map(book => (
                            <BrowserBook
                                key={book.id}
                                name={book.name}
                                author={book.author}
                                category={book.category}
                                price={book.price}
                                rating={book.rating}
                                alreadyAdded={book.alreadyAdded}
                                detailClicked={() => this.goToItemDetailHandler(book.id)} />
                        ))}
                    </Grid>
                    <Dimmer active={this.props.loading} inverted>
                        <Loader />
                    </Dimmer>
                </Grid.Column>
            </Grid>
        );
    }
};

const mapStateToProps = state => {
    return {
        storeItems: state.store.fetchedItems,
        loading: state.store.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchStore: () => dispatch(actions.fetchStoreItems()),
        onFetchBook: (bookId) => dispatch(actions.fetchBook(bookId)),
        onFilterBooks: (filterOptions) => dispatch(actions.filterStoreItems(filterOptions))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookBrowser);