import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './MyBooks.css';
import LibraryBook from '../../components/LibraryBook/LibraryBook';
import * as actions from '../../store/actions/index';
import ErrorHeader from '../../components/UI/ErrorHeader/ErrorHeader';

class MyBooks extends Component {

    constructor(props) {
        super(props);
        this.props.onFetchBooks();
    }

    clickHandler = () => {
        this.props.history.push('store/')
    }

    render() {
        let component = (
            <ErrorHeader
                icon="remove bookmark"
                subHeader="Your books can be seen here"
                text="Go To Shop!"
                onClick={this.clickHandler} />
        );

        if (this.props.myBooks.length > 0) {

            let items = this.props.myBooks.map(book => (
                <LibraryBook
                    key={book.id}
                    name={book.name}
                    author={book.author}
                    category={book.category}
                    rating={book.rating}>
                </LibraryBook>
                // <Item key={book.id}>
                //     <Item.Image>
                //         <Icon name="book" size="massive" fitted />
                //     </Item.Image>

                //     <Item.Content>
                //         <Item.Header >{book.name}</Item.Header>
                //         <Label style={{ marginLeft: "1em" }}>
                //             {book.category}
                //         </Label>
                //         <Item.Description>
                //             {book.description}
                //         </Item.Description>
                //     </Item.Content>
                // </Item>
            ));

            component = (
                <Container>
                    <Grid stackable>
                        {items}
                    </Grid>
                </Container>

            );
        }

        return (
            <div>{component}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        myBooks: state.order.myBooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBooks: () => dispatch(actions.fetchMyBooks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);