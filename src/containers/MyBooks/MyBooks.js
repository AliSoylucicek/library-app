import React, { Component } from 'react';
import { Item, Label, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './MyBooks.css';
import * as actions from '../../store/actions/index';
import ErrorHeader from '../../components/UI/ErrorHeader/ErrorHeader';

class MyBooks extends Component {

    componentWillMount() {
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
                link="Go To Shop!"
                onClick={this.clickHandler} />
        );

        if (this.props.myBooks.length > 0) {

            let items = this.props.myBooks.map(book => (
                <Item key={book.id}>
                    <Item.Image>
                        <Icon name="book" size="massive" fitted />
                    </Item.Image>
                    
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

            component = (
                <Item.Group as={Segment}>
                    {items}
                </Item.Group>
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