import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <Menu.Item
            name={props.name}
            as={NavLink}
            to={props.link}
            exact={props.exact}
            active={props.active}
            onClick={props.onClick}
            icon={props.icon}>
            {props.children}
        </Menu.Item>
    );

};

export default navigationItem;