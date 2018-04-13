import React, { Component } from 'react';

import { Grid, Container } from 'semantic-ui-react';

import './BookBrowser.css';
import BrowserBook from '../../../components/BrowserBook/BrowserBook';

class BookBrowser extends Component {

    render(){
        return (
            <Grid as={Container} attached="bottom" doubling>
                {this.props.books.map(book => (
                    <BrowserBook
                        key={book.id}
                        name={book.name}
                        author={book.author}
                        category={book.category}
                        price={book.price}
                        rating={book.rating}
                        alreadyAdded={book.alreadyAdded}
                        detailClicked={()=>this.props.goToItem(book.id)} />
                ))}
            </Grid>
        );
    }
};


export default BookBrowser;