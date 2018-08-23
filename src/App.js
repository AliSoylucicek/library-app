import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Store from './containers/Store/Store';
import Cart from './containers/Cart/Cart';
import MyBooks from './containers/MyBooks/MyBooks';
import Dashboard from './containers/Dashboard/Dashboard';


class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path="/store" component={Store} />
        <Route path="/myBooks" component={MyBooks} />
        <Route path="/cart" component={Cart} />
        <Route path="/home" component={Dashboard} />
        <Redirect to="/home"/>
      </Switch>
    );

    return (
      <Layout cartItems={this.props.itemCount}>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(App) ;
