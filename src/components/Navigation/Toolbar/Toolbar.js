import React, { Component } from 'react';
import { Menu, Icon, Label, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import NavigationItem from '../NavigationItem/NavigationItem';
import './Toolbar.css';

const trigger = (
    <span>
        <Icon name='user' /> Hello, John
    </span>
)

class Toolbar extends Component {
    state = {
        isAuthenticated: true
    }

    render() {
        return (
            <div>
                <Menu inverted attached="bottom">
                    <NavigationItem link="/" name="Home" exact></NavigationItem>
                    <NavigationItem link="/store" name="Store" exact></NavigationItem>
                    <NavigationItem link="/myBooks" name="My Books" exact></NavigationItem>
                    <Icon name="book" size="big" inverted style={{ position: "absolute", left: "50%", marginTop: ".5rem" }} />

                    <Menu.Menu position="right">
                        <Dropdown trigger={trigger} item>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Icon name="heart" color="red" />
                                    Favourites
                                </Dropdown.Item>
                                <Dropdown.Item>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <NavigationItem link="/cart" exact>
                            <Icon name="shopping bag"  size="large" inverted />
                            {this.props.itemCount > 0 ? <Label circular size="tiny" color="red" floating>{this.props.itemCount}</Label> : null}
                        </NavigationItem>
                    </Menu.Menu>
                </Menu>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemCount: state.order.itemCount
    };
};

export default connect(mapStateToProps)(Toolbar);