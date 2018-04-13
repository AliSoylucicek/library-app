import React, { Component } from 'react';
import { Responsive } from 'semantic-ui-react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideToolbar from '../../components/Navigation/SideToolbar/SideToolbar';

export default class Layout extends Component {
    state = {
        isAuthenticated: true
    }

    render() {
        return (
            <Aux>
                <Responsive maxWidth={767}>
                    <SideToolbar>
                        {this.props.children}
                    </SideToolbar>
                </Responsive>

                <Responsive minWidth={768}>
                    <Toolbar>
                        {this.props.children}
                    </Toolbar>
                </Responsive>
            </Aux>

        );
    }
}