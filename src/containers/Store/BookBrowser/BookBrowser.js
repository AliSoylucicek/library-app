import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Container,
    Select,
    Segment,
    Button,
    Form,
    Dimmer,
    Loader,
    Pagination,
    FormField,
    Input
} from 'semantic-ui-react';

import './BookBrowser.css';

import * as actions from '../../../store/actions/index';
import { categoryOptions, sortOptions } from '../../../shared/filterOptions';
import { updateObject } from '../../../shared/utility';
import BrowserBook from '../../../components/BrowserBook/BrowserBook';
import ErrorHeader from '../../../components/UI/ErrorHeader/ErrorHeader';

class BookBrowser extends Component {

    state = {
        filterOptions: {
            category: "",
            sorting: "",
            search: ""
        },
        page: 1
    }

    componentDidMount() {
        this.props.onFetchStore();
    }

    componentWillUpdate(nextProps, nextState) {
        window.scroll(0, 0)
    }

    goToItemDetailHandler = (id) => {
        this.props.history.push('/store/' + id);
    }

    handleFilter = () => {
        this.props.onFilterBooks(this.state.filterOptions)
    }

    sortSelectionHandler = (e, { value }) => {
        const updatedOptions = updateObject(this.state.filterOptions, { sorting: value });
        this.setState({ filterOptions: updatedOptions }, () => {
            this.props.onFilterBooks(this.state.filterOptions)
        })
    }

    handleReset = () => {
        this.setState({ filterOptions: { category: "", search: "" }, page: 1 }, () => {
            this.props.onFilterBooks(this.state.filterOptions)
        })
    }

    handleInputChange = (e, { value }) => {
        const updatedOptions = updateObject(this.state.filterOptions, { search: value });
        this.setState({ filterOptions: updatedOptions });
    }

    handleSelection = (e, { value }) => {
        const updatedOptions = updateObject(this.state.filterOptions, { category: value });
        this.setState({ filterOptions: updatedOptions });
    }

    handlePageChange = (e, { activePage }) => {
        if (activePage !== this.state.page) {
            this.setState({ page: activePage });
            const updatedOptions = updateObject(this.state.filterOptions, { page: activePage });
            this.setState({ filterOptions: updatedOptions }, () => {
                this.props.onFilterBooks(this.state.filterOptions)
            })
        }

    }


    render() {

        let contents = null;
        if (this.props.storeItems.length < 1) {
            contents = <ErrorHeader icon="search" header="Oops!" subHeader="No books found with the filter options" />;
        }
        else {
            contents = (
                <Grid stackable>
                    {this.props.storeItems.map(book => (
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
                    ))}
                </Grid>);
        }

        let pagination = this.props.totalPages > 1 ? <Grid centered>
            <Grid.Column width={8} textAlign="center">
                <Pagination activePage={this.state.page}
                    totalPages={this.props.totalPages}
                    onPageChange={this.handlePageChange}
                    firstItem={this.state.page > 5 ? undefined : null}
                    lastItem={this.state.page < this.props.totalPages - 5 ? undefined : null}
                    prevItem={this.state.page > 1 ? undefined : null}
                    nextItem={this.state.page < this.props.totalPages ? undefined : null}
                />
            </Grid.Column>
        </Grid>
        : null

        return (
            <Grid as={Container} stackable>
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
                            <FormField control={Input}
                                icon="search"
                                placeholder="Search..."
                                value={this.state.filterOptions.search}
                                onChange={this.handleInputChange} />
                            <Form.Field control={Button} fluid primary onClick={this.handleFilter} loading={this.props.loading} disabled={this.props.loading}>Filter</Form.Field>
                            <Form.Field control={Button} fluid onClick={this.handleReset} disabled={this.props.loading}>Reset</Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={12} computer={13}>
                    <Segment>
                        <Select options={sortOptions} defaultValue={"added"} selectOnBlur={false} onChange={this.sortSelectionHandler}>
                        </Select>
                    </Segment>
                    {contents}
                    {pagination}
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
        totalPages: state.store.totalPages,
        loading: state.store.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchStore: () => dispatch(actions.fetchStoreItems()),
        onFilterBooks: (filterOptions) => dispatch(actions.filterStoreItems(filterOptions))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookBrowser);