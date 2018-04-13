import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

import './ErrorHeader.css';

const errorHeader = (props) => {
    return (
        <Segment basic>
            <Header as='h2' icon textAlign="center">
                <Icon name={props.icon} />
                {props.header}
                <Header.Subheader>
                    {props.subHeader}
                </Header.Subheader>
            </Header>
        </Segment>
    );
};

export default errorHeader;