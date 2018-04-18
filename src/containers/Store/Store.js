import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BookBrowser from './BookBrowser/BookBrowser';
import BookDetail from './BookDetail/BookDetail';

class Store extends Component {

    render() {
        return (
            <Switch>
                <Route path='/store' exact component={BookBrowser}/>
                <Route path={this.props.match.url + '/:id'} component={BookDetail}/>
            </Switch>
        );
    }
}

export default Store;
