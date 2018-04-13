import React, { Component } from 'react';
import { Item, Label, Icon, Container, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './MyBooks.css';
import * as actions from '../../store/actions/index';
import ErrorHeader from '../../components/UI/ErrorHeader/ErrorHeader';

class MyBooks extends Component {

    componentWillMount() {
        this.props.onFetchBooks();
    }

    render() {
        let component = (
            <ErrorHeader
                icon="remove bookmark"
                header="Oops!"
                subHeader="Your books can be seen here"
                link="Go To Shop!" />
        );

        if (this.props.myBooks.length > 0) {

            let items = this.props.myBooks.map(book => (
                <Item key={book.id}>
                    <Icon name="book" size="big" fitted style={{ marginLeft: "20px" }} />
                    <Item.Content>
                        <Item.Header >{book.name}</Item.Header>
                        <Label style={{ marginLeft: "1em" }}>
                            {book.category}
                        </Label>

                        <Item.Description>
                            {book.description}
                        </Item.Description>

                    </Item.Content>
                </Item>
            ));

            console.log(items);

            component = (
                <Item.Group as={Segment}>
                    {items}
                </Item.Group>
            );
        }

        return (
            <Container fluid>
                {component}
            </Container>
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